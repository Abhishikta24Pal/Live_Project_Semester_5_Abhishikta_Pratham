// frontend/src/components/YouNowRecorder.jsx
import React, { useRef, useState } from 'react';
import { uploadToCloudinary } from '../lib/cloudinaryUpload';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function YouNowRecorder() {
  const [type, setType] = useState('audio'); // 'audio' or 'video'
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  const startRecording = async () => {
    setError(null);
    try {
      const constraints = type === 'video'
        ? { video: { width: 640 }, audio: true }
        : { audio: true, video: false };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);

      // show preview if video
      if (type === 'video') {
        const vid = document.getElementById('yn-preview');
        if (vid) {
          vid.srcObject = stream;
          vid.muted = true;
          vid.play().catch(()=>{});
        }
      }

      const options = {};
      // create recorder
      const mr = new MediaRecorder(stream, options);
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: chunksRef.current[0]?.type || (type === 'video' ? 'video/webm' : 'audio/webm') });
        const ext = blob.type.split('/')[1] || 'webm';
        const filename = `${type}_${Date.now()}.${ext}`;
        const file = new File([blob], filename, { type: blob.type });

        // preview
        setPreviewUrl(URL.createObjectURL(blob));

        // upload
        setUploading(true);
        setProgress(0);
        try {
          const resp = await uploadToCloudinary(file, (p) => setProgress(p));

          const user = auth.currentUser;
          if (!user) throw new Error('Not authenticated');

          await addDoc(collection(db, 'users', user.uid, 'memories'), {
            type,
            cloudinary_public_id: resp.public_id,
            url: resp.secure_url,
            mimeType: resp.resource_type + '/' + (resp.format || ''),
            filename: resp.original_filename || filename,
            duration: resp.duration || null,
            notes: notes || null,
            createdAt: serverTimestamp(),
            rawResponse: resp
          });

          setNotes('');
          setUploading(false);
          setProgress(100);
          alert('Saved to memories');
        } catch (err) {
          console.error(err);
          setError(err.message || 'Upload failed');
          setUploading(false);
        }
      };

      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not start recording');
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(t => t.stop());
        setMediaStream(null);
      }
      setRecording(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-4" style={{ maxWidth: 720 }}>
      <h3>You Now / Memories</h3>

      <div style={{ marginBottom: 8 }}>
        <label style={{ marginRight: 12 }}>
          <input type="radio" checked={type === 'audio'} onChange={() => setType('audio')} /> Audio
        </label>
        <label>
          <input type="radio" checked={type === 'video'} onChange={() => setType('video')} /> Video
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
        {' '}
        {uploading && <span>Uploading {progress}%</span>}
      </div>

      <div style={{ marginTop: 8 }}>
        <textarea placeholder="Add a short note/context (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ width: '100%' }} />
      </div>

      {type === 'video' && <video id="yn-preview" style={{ width: 320, height: 240, background: '#000', marginTop: 12 }} playsInline muted />}

      {previewUrl && (
        <div style={{ marginTop: 12 }}>
          <h4>Preview</h4>
          {type === 'video' ? (
            <video src={previewUrl} controls style={{ width: 360 }} />
          ) : (
            <audio src={previewUrl} controls />
          )}
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

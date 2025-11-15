// frontend/src/components/YouNowHistory.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function YouNowHistory() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'users', user.uid, 'memories'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setMemories(arr);
    }, (err) => {
      console.error('memories snapshot error', err);
    });

    return () => unsub();
  }, []);

  if (!auth.currentUser) return <div>Please sign in.</div>;

  return (
    <div className="card p-4" style={{ marginTop: 16, maxWidth: 780 }}>
      <h3>Your Memories / History</h3>
      {memories.length === 0 && <div>No memories yet.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {memories.map(m => (
          <li key={m.id} style={{ marginBottom: 18, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{(m.type || 'unknown').toUpperCase()}</strong>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {new Date((m.createdAt?.seconds || Date.now()/1000) * 1000).toLocaleString()}
                </div>
              </div>
              <div style={{ fontSize: 12 }}>{m.filename}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              {m.type === 'video' && <video src={m.url} controls style={{ width: 420 }} />}
              {m.type === 'audio' && <audio src={m.url} controls />}
              {m.type === 'text' && <div>{m.notes}</div>}
            </div>

            {m.notes && <div style={{ marginTop: 8, color: '#333' }}>Notes: {m.notes}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

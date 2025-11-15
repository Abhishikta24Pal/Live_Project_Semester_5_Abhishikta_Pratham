// frontend/src/components/JournalEditor.jsx
import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { doc, setDoc, updateDoc, serverTimestamp as st } from "firebase/firestore";

function dateLabelFromTs(d = new Date()) {
  return d.toISOString().slice(0,10); // YYYY-MM-DD
}

export default function JournalEditor({ user }) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const timerRef = useRef(null);

  // load today's last entry (if any) — optional: you may want to prefill with last draft
  useEffect(() => {
    const q = query(collection(db, "users", user.uid, "journals"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs;
      if (docs.length) {
        // If most recent doc is today, load it
        const first = docs[0];
        const data = first.data();
        const label = data.dateLabel;
        if (label === dateLabelFromTs()) {
          setContent(data.content || "");
          setCurrentDocId(first.id);
        } else {
          // new blank for today
          setContent("");
          setCurrentDocId(null);
        }
      } else {
        setContent("");
        setCurrentDocId(null);
      }
    });
    return () => unsub();
  }, [user.uid]);

  // Debounced autosave
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveContent();
    }, 1500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  async function saveContent() {
    setSaving(true);
    try {
      const payload = {
        content,
        updatedAt: serverTimestamp(),
        dateLabel: dateLabelFromTs(),
        title: content.split("\n")[0]?.slice(0,80) || dateLabelFromTs()
      };
      if (!currentDocId) {
        // create
        const col = collection(db, "users", user.uid, "journals");
        const ref = await addDoc(col, { ...payload, createdAt: serverTimestamp() });
        setCurrentDocId(ref.id);
      } else {
        const docRef = doc(db, "users", user.uid, "journals", currentDocId);
        await updateDoc(docRef, payload);
      }
    } catch (err) {
      console.error("save error", err);
    }
    setSaving(false);
  }

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Write — {new Date().toLocaleDateString()}</h3>
        <div className="text-sm text-slate-500">{saving ? "Saving..." : "Saved"}</div>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="How was your day? What are you feeling? Start typing..."
        rows={12}
        className="w-full p-3 border rounded resize-y"
      />
      <div className="mt-2 flex gap-2">
        <button onClick={saveContent} className="px-3 py-1 bg-slate-800 text-white rounded">Save now</button>
      </div>
    </div>
  );
}

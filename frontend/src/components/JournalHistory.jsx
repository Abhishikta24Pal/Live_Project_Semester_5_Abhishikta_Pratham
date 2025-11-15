// frontend/src/components/JournalHistory.jsx
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function JournalHistory({ user }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users", user.uid, "journals"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snap => {
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user.uid]);

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h4 className="text-lg font-semibold mb-2">Memories</h4>
      {entries.length === 0 && <div className="text-slate-500">No entries yet.</div>}
      <ul className="space-y-2 max-h-96 overflow-auto">
        {entries.map(e => (
          <li key={e.id} className="border rounded p-2 hover:bg-slate-50">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{e.title || e.dateLabel}</div>
                <div className="text-xs text-slate-500">{(e.createdAt && e.createdAt.toDate) ? e.createdAt.toDate().toLocaleString() : e.dateLabel}</div>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">{e.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

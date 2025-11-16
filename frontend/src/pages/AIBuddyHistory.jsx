// frontend/src/pages/AIBuddyHistory.jsx
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { listSavedDates } from "../lib/AIBuddyStorage";
import { useNavigate } from "react-router-dom";

export default function AIBuddyHistory() {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();

  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    async function load() {
      const list = await listSavedDates(uid);
      setDates(list);
      setLoading(false);
    }
    load();
  }, [uid]);

  return (
    <main className="min-h-screen bg-[#6C9BCF] text-ink p-6 md:p-10">
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">AI Buddy Memories</h1>
        <p className="mb-6 text-gray-600">
          Your saved AI Buddy conversations sorted by date.
        </p>

        {loading && <p>Loading...</p>}

        {!loading && dates.length === 0 && (
          <p className="text-gray-500">No AI conversations saved yet.</p>
        )}

        <div className="space-y-4">
          {dates.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-xl border bg-white shadow hover:shadow-md transition cursor-pointer flex items-center justify-between"
              onClick={() => navigate(`/ai-buddy/history/${d.id}`)}
            >
              <span className="font-medium text-lg">{d.id}</span>
              <span className="text-sm opacity-70">
                {d.createdAt?.toDate
                  ? new Date(d.createdAt.toDate()).toLocaleString()
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

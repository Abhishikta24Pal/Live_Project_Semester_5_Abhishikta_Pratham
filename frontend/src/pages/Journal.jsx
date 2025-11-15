// frontend/src/pages/Journal.jsx
import React, { useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import JournalEditor from "../components/JournalEditor";
import JournalHistory from "../components/JournalHistory";
import ReauthModal from "../components/ReauthModal";

export default function Journal() {
  const [user, setUser] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [requireReauth, setRequireReauth] = useState(false);
  const [reauthOk, setReauthOk] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  // When user clicks Memories, we require reauth
  function openMemories() {
    setRequireReauth(true);
  }

  async function onReauthSuccess() {
    setRequireReauth(false);
    setReauthOk(true);
    setShowHistory(true);
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Journal</h1>
          <div>
            <button onClick={openMemories} className="px-3 py-1 rounded bg-slate-100">Memories</button>
          </div>
        </header>

        {!user && <div>Please sign in to use Journal.</div>}

        {user && (
          <>
            <JournalEditor user={user} />

            {showHistory && reauthOk && (
              <JournalHistory user={user} />
            )}

            {requireReauth && (
              <ReauthModal
                user={user}
                onSuccess={onReauthSuccess}
                onCancel={() => setRequireReauth(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

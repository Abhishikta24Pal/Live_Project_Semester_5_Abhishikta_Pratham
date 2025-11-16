// frontend/src/components/AIBuddyToggle.jsx
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import AIBuddyWindow from "./AIBuddyWindow";

export default function AIBuddyToggle() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return null;

  return (
    <>
      {open && <AIBuddyWindow onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen((s) => !s)}
        aria-label="chatbot"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl
                   bg-gradient-to-br from-[#F490B1] to-[#6C9BCF] text-white
                   flex items-center justify-center hover:scale-105 transition"
      >
        💬
      </button>
    </>
  );
}

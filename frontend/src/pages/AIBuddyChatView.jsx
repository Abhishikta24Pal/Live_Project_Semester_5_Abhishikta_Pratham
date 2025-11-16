// frontend/src/pages/AIBuddyChatView.jsx
import React, { useEffect, useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import { fetchMessages } from "../lib/AIBuddyStorage";
import { useParams, useNavigate } from "react-router-dom";

export default function AIBuddyChatView() {
  const { date } = useParams(); // ← from route
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    async function load() {
      if (!uid) return;
      const msgs = await fetchMessages(uid, date);
      setMessages(msgs);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
    load();
  }, [uid, date]);

  return (
    <main className="min-h-screen bg-[#6C9BCF] p-6 md:p-10">
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-3xl mx-auto flex flex-col">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 underline"
        >
          ← Back to Memories
        </button>

        <h1 className="text-2xl font-bold mb-2">Chat from {date}</h1>

        <div className="flex-1 overflow-auto space-y-4 mt-4 border p-4 rounded-xl bg-gray-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-xl ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-[#FDECEF] to-[#FFDDE6]"
                    : "bg-white border"
                }`}
              >
                <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                <div className="text-xs mt-1 opacity-60 text-right">
                  {m.createdAt?.toDate
                    ? new Date(m.createdAt.toDate()).toLocaleTimeString()
                    : ""}
                </div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>
    </main>
  );
}

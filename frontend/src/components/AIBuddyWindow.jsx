import React, { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  listenMessagesRealtime,
  saveMessage,
  listSavedDates,
} from "../lib/AIBuddyStorage";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

async function generateSessionId(uid) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const base = `${y}-${m}-${d}`; // main date ID

  // Get existing sessions
  const col = collection(db, "users", uid, "aiChats");
  const snap = await getDocs(col);

  let count = 0;
  snap.forEach((doc) => {
    if (doc.id.startsWith(base)) count++;
  });

  // First session of the day → use base only
  if (count === 0) return base;

  return `${base}_${count}`;
}

function useTypingReveal(fullText, speed = 20) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplay("");

    if (!fullText) return;
    const id = setInterval(() => {
      i++;
      setDisplay(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [fullText, speed]);
  return display;
}

export default function AIBuddyWindow({ onClose }) {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [assistantTypingText, setAssistantTypingText] = useState("");

  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (uid) {
      generateSessionId(uid).then((id) => {
        setSessionId(id);
      });
    }
  }, [uid]);

  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setAssistantTypingText(
          "Hi there. It's lovely to connect with you.\nHow are you feeling today?\nI'm here to listen and offer gentle support if you need it."
        );
      }, 350);
    }
  }, [messages]);

  useEffect(() => {
    if (!uid || !sessionId) return;

    const unsub = listenMessagesRealtime(
      uid,
      sessionId,
      (arr) => {
        setMessages(arr);
        setTimeout(
          () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
          50
        );
      },
      (err) => console.error("Realtime error:", err)
    );

    return () => unsub();
  }, [uid, sessionId]);

  const assistantReveal = useTypingReveal(assistantTypingText, 12);

  const send = async () => {
    const trimmed = text.trim();
    if (!trimmed || !uid || !sessionId) return;

    setSending(true);

    // save your message
    await saveMessage(uid, sessionId, { role: "user", text: trimmed });
    setText("");

    // AI typing start
    setAssistantTypingText("...");

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/anon/gemini`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        }
      );

      const j = await resp.json();
      const reply =
        j.reply ||
        "I'm thinking about that… could you tell me a bit more?";

      setAssistantTypingText(reply);

      await saveMessage(uid, sessionId, {
        role: "assistant",
        text: reply,
        extra: { source: "gemini" },
      });

      setTimeout(() => setAssistantTypingText(""), 300);
    } catch (err) {
      console.error("AI error:", err);

      await saveMessage(uid, sessionId, {
        role: "assistant",
        text: "Hmm, I’m having trouble replying right now. Try again shortly.",
      });
    }

    setSending(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      className="fixed bottom-24 right-6 z-50 w-[360px] md:w-[420px] max-h-[70vh] rounded-2xl shadow-2xl overflow-hidden
                 bg-white dark:bg-[#101217] flex flex-col"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#F5A6C2] to-[#8FB6DA]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center font-semibold">
            AI
          </div>
          <div>
            <div className="font-semibold text-sm">AI Buddy</div>
            <div className="text-xs opacity-80">
              Gentle support. Saved to your memories.
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-white/20"
          aria-label="close"
        >
          ✕
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[78%] p-3 rounded-xl ${
                m.role === "user"
                  ? "bg-gradient-to-r from-[#FDECEF] to-[#FFDDE6] text-black"
                  : "bg-white dark:bg-[#0F1720] text-black dark:text-white"
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

        {assistantReveal && (
          <div className="flex justify-start">
            <div className="max-w-[78%] p-3 rounded-xl bg-white dark:bg-[#0F1720]">
              <div style={{ whiteSpace: "pre-wrap" }}>{assistantReveal}</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t bg-white dark:bg-[#0b0c10]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          rows={2}
          placeholder="Write something... (press Enter to send)"
          className="w-full rounded-lg p-2 border resize-none focus:outline-none"
          disabled={sending}
        />

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs opacity-70">
            Your conversation is private and saved to your profile.
          </div>

          <button
            onClick={send}
            disabled={sending || !text.trim()}
            className="bg-gradient-to-br from-[#F490B1] to-[#6C9BCF] px-4 py-1 rounded-md text-white disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef } from "react";

export default function AnonChat() {
  const [messages, setMessages] = useState([
  { role: "bot", text: "Hello! I’m your AI Support Buddy. How are you feeling today?"}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  async function sendMessage(e) {
    e?.preventDefault();
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setLoading(true);
    try {
      //BACKEND CALL
      const resp = await fetch("http://localhost:5000/api/anon/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });
      const payload = await resp.json();
      if (!resp.ok) {
        const err = payload?.error || payload;
        setMessages((m) => [...m, { role: "bot", text: `Error: ${err}` }]);
        return;
      }
      // ASSISSTANT RESPONSE FROM BACKEND
      let botText = "Sorry, no response.";
        if (payload?.reply) {
          botText = payload.reply;
        }
      setMessages((m) => [...m, { role: "bot", text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: "bot", text: "Network error. Try again." }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
    }
  }
  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD p-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white/80 border border-ssCardBrd p-6 shadow-ss">
          <h1 className="text-2xl font-bold text-ssNavy mb-2">AI Support Buddy (Guest)</h1>
          <p className="text-sm text-ssText/80 mb-4">Anonymous chat. Your messages are not saved.</p>

          <div className="border rounded-lg p-4 h-[60vh] overflow-auto bg-ssCardBg">
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-xl ${m.role === "user" ? "bg-ssPrimary text-white" : "bg-secondary text-ink"}`}>
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={scrollRef} />
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write something... (anonymous)"
              className="flex-1 px-4 py-2 rounded-lg border border-ssCardBrd focus:ring-2 focus:ring-ssPrimary outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-ssPrimary text-white disabled:opacity-60"
              disabled={loading || !input.trim()}
            >
              {loading ? "Thinking…" : "Send"}
            </button>
          </form>
        </div>

        <p className="text-xs text-gray-500 mt-3">Tip: This is a guest chat — it resets on refresh.</p>
      </div>
    </main>
  );
}

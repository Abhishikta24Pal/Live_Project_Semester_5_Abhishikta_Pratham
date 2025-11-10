// frontend/src/pages/Stories.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function Stories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        const res = await fetch(`${API_BASE}/api/stories/curated`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Load failed");
        setItems(json.data || []);
      } catch (e) {
        console.error(e);
        setErr("Could not load stories.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-ssNavy dark:text-ssNavyD">
            Healing Stories
          </h1>
          <p className="text-sm opacity-80">Pick a story to listen or read.</p>
        </header>

        {loading && <div className="rounded-xl p-4 border bg-ssCardBg dark:bg-ssCardBgD">Loading…</div>}
        {err && !loading && (
          <div className="rounded-xl p-4 border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/30">
            {err}
          </div>
        )}

        {!loading && !err && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((s) => (
              <Link
                key={s.id}
                to={`/anon/stories/curated/${s.id}`}
                className="group rounded-2xl border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD p-4 hover:shadow-md transition"
              >
                <div className="text-sm opacity-70">{s.mood} · {s.topic}</div>
                <h3 className="text-lg font-semibold text-ssNavy dark:text-ssNavyD mt-1">
                  {s.title}
                </h3>
                <p className="text-sm opacity-80 line-clamp-3 mt-2">{s.summary}</p>
                <div className="text-xs opacity-60 mt-3">{s.minutes} min</div>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link
            to="/anon/stories/generate"
            className="inline-block px-4 py-2 rounded-lg bg-ssPrimary text-white hover:bg-ssPrimaryH"
          >
            Or craft a custom AI story →
          </Link>
        </div>
      </div>
    </main>
  );
}

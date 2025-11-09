import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function AnonDailyLife() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/audio`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.ok) setTracks(json.data || []);
        else throw new Error(json.error || "Failed to load audio list");
      } catch (e) {
        console.error(e);
        setError("Could not load audio list. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-ssNavy dark:text-ssNavyD">
          Usual Daily Life — Audio Support
        </h1>
        <p className="mb-6 text-sm opacity-80">
          Tap to listen. You can also download for your offline comfort.
        </p>

        {loading && (
          <div className="rounded-xl border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD p-4">
            Loading tracks…
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/30 p-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-4">
            {tracks.length === 0 && (
              <div className="rounded-xl border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD p-4">
                No tracks found yet.
              </div>
            )}

            {tracks.map((t) => {
              const title = t.title || t.name.replace(/\.mp3$/i, "");
              return (
                <div
                  key={t.name}
                  className="p-4 rounded-2xl shadow-ss border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-lg text-ssNavy dark:text-ssNavyD">
                        {title}
                      </div>
                      <div className="text-xs opacity-70">{t.name}</div>
                    </div>

                    {/* Download */}
                    <a
                      href={`${API_BASE}${t.url}`}
                      download={t.name}
                      className="text-sm bg-ssPrimary hover:bg-ssPrimaryH text-white px-3 py-1.5 rounded-lg"
                    >
                      Download
                    </a>
                  </div>

                  {/* Individual player per track */}
                  <audio
                    controls
                    preload="none"
                    className="w-full mt-3 rounded-lg"
                    src={`${API_BASE}${t.url}`}
                    onPlay={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
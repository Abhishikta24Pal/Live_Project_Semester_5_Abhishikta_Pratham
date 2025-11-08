// frontend/src/pages/AnonDailyLife.jsx
import { useEffect, useState } from "react";

export default function AnonDailyLife() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAudioList() {
      try {
        const res = await fetch("http://localhost:5000/api/audio");
        const json = await res.json();
        if (json.ok) setTracks(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAudioList();
  }, []);

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-ssNavy dark:text-ssNavyD mb-6">
          Usual Daily Life — Hear Exactly What You Need!
        </h1>

        {loading ? (
          <p>Loading tracks...</p>
        ) : (
          <div className="grid gap-4">
            {tracks.map((t) => (
              <div
                key={t.name}
                className="p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-ssCardBrd dark:border-ssCardBrd
                           bg-ssCardBg dark:bg-ssCardBgD"
              >
                <div className="font-semibold text-lg text-ssNavy dark:text-ssNavyD">
                  {t.title || t.name.replace(/\.mp3$/i, "")}
                </div>

                <audio
                  controls
                  className="w-full rounded-lg mt-2 accent-ssPrimary"
                  src={`http://localhost:5000${t.url}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

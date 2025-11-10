import { useEffect, useState } from "react";

const colors = {
  light: {
    bg: "#F5F8FA",
    card: "#FFFFFF",
    text: "#2E2E2E",
    primary: "#6C9BCF",
    hover: "#5B8FB9"
  },
  dark: {
    bg: "#1C1F2A",
    card: "#2A3142",
    text: "#EAEAEA",
    primary: "#5B8FB9",
    hover: "#6C9BCF"
  }
};

export default function SleepYouNeed() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/sleep`);
        const json = await res.json();
        if (json.ok) setTracks(json.data || []);
        else throw new Error(json.error);
      } catch (err) {
        console.error(err);
        setError("Failed to load sleep audios.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-6" style={{ background: colors.light.bg, color: colors.light.text }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🌙 The Sleep You Need</h1>
        <p className="mb-6 opacity-80">Relax your mind — drift into deep, peaceful sleep.</p>

        {loading && <div>Loading audios...</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="grid gap-4">
          {tracks.map((t) => (
            <div key={t.title} className="p-4 rounded-xl shadow-sm border" style={{ background: colors.light.card }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-lg">{t.title}</div>
                  <div className="text-sm opacity-70">{t.source}</div>
                </div>
                <a
                  href={`${import.meta.env.VITE_API_BASE}${t.url}`}
                  download
                  className="px-3 py-1.5 rounded-md text-white"
                  style={{ background: colors.light.primary }}
                >
                  Download
                </a>
              </div>
              <audio controls className="w-full rounded-lg mt-2" src={`${import.meta.env.VITE_API_BASE}${t.url}`} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

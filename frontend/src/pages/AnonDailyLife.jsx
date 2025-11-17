// frontend/src/pages/AnonDailyLife.jsx
import { useRef, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function AnonDailyLife() {
  const [tracks, setTracks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [rates, setRates] = useState({});
  const [pitches, setPitches] = useState({});
  const [looping, setLooping] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const audioRefs = useRef({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/audio_daily_life`);
        const json = await res.json();
        if (json.ok) setTracks(json.data || []);
        else throw new Error(json.error || "Failed to load");
      } catch (err) {
        console.error(err);
        setError("Could not load daily life audios.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // === AUDIO CONTROLS (same as meditation) ===
  const handlePlay = (id) => {
    Object.entries(audioRefs.current).forEach(([key, el]) => {
      if (key !== id && el && !el.paused) el.pause();
    });
    setActiveId(id);
    audioRefs.current[id]?.play()?.catch(() => {});
  };

  const handlePause = (id) => {
    audioRefs.current[id]?.pause();
    if (activeId === id) setActiveId(null);
  };

  const togglePlay = (id) => {
    const el = audioRefs.current[id];
    if (!el) return;
    el.paused ? handlePlay(id) : handlePause(id);
  };

  const setRate = (id, val) => {
    const el = audioRefs.current[id];
    if (el) {
      el.playbackRate = Number(val);
      setRates((s) => ({ ...s, [id]: Number(val) }));
    }
  };

  const setPitch = (id, val) => {
    setPitches((s) => ({ ...s, [id]: Number(val) }));
  };

  const setLoop = (id, val) => {
    const el = audioRefs.current[id];
    if (el) el.loop = !!val;
    setLooping((s) => ({ ...s, [id]: !!val }));
  };

  const downloadTrack = (filename) => {
    const url = `${API_BASE}/api/audio_daily_life/${encodeURIComponent(filename)}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // === UI ===
  return (
    <main className="min-h-screen bg-[#6C9BCF]  text-ssText dark:bg-ssBgD dark:text-ssNavyD px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-black dark:text-ssNavyD">
            Daily Life — Emotional Support Audios
          </h1>
          <p className="opacity-80 text-black text-sm">
            Short emotional-support audios for overwhelm, breakup, anger, clarity & more.
          </p>
        </header>

        {loading && <div>Loading tracks…</div>}
        {error && <div className="text-red-500">{error}</div>}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, index) => {
            const id = `life_${index}`;
            const url = `${API_BASE}${t.url}`;
            const rate = rates[id] ?? 1.0;
            const pitch = pitches[id] ?? 1.0;
            const loop = looping[id] ?? false;
            const title = t.title || t.name.replace(/\.mp3$/i, "");

            return (
              <article
                key={id}
                className="rounded-2xl overflow-hidden border border-ssCardBrd dark:border-ssCardBrd 
                  bg-ssCardBg dark:bg-ssCardBgD shadow-ss flex flex-col"
              >
                {/* Gradient Header */}
                <div
                  className={`h-28 bg-gradient-to-r relative ${
                    index % 4 === 0
                      ? "from-[#FFB59E] to-[#FF8E72]" // Peach
                      : index % 4 === 1
                      ? "from-[#FFD27F] to-[#FFB347]" // Sunrise
                      : index % 4 === 2
                      ? "from-[#F7A6FF] to-[#C47DFF]" // Lavender
                      : "from-[#A3E8FF] to-[#6DC6E5]" // Aqua
                  }`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-2 left-3 text-white drop-shadow-lg">
                    <div className="text-lg font-semibold">{title}</div>
                    <div className="text-xs opacity-90">Daily Life Audio</div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-ssAccent/40 text-ssNavy">
                      Daily
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-ssAccent/40 text-ssNavy">
                      Support
                    </span>
                  </div>

                  {/* Audio Player */}
                  <audio
                    ref={(el) => (audioRefs.current[id] = el)}
                    className="w-full mt-1"
                    src={url}
                    controls
                    preload="none"
                    onPlay={() => setActiveId(id)}
                    onEnded={() => setActiveId(null)}
                  />

                  {/* Controls */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => togglePlay(id)}
                      className={`px-3 py-2 rounded-lg text-white ${
                        activeId === id ? "bg-ssPrimaryH" : "bg-ssPrimary"
                      }`}
                    >
                      {activeId === id ? "Pause" : "Play"}
                    </button>

                    <button
                      onClick={() => downloadTrack(t.name)}
                      className="px-3 py-2 rounded-lg bg-ssCardBrd hover:opacity-90"
                    >
                      Download
                    </button>

                    {/* Speed */}
                    <label className="text-xs grid gap-1">
                      <span className="opacity-70">Speed</span>
                      <select
                        value={rate}
                        onChange={(e) => setRate(id, e.target.value)}
                        className="px-2 py-1 rounded-md border border-ssCardBrd bg-white dark:bg-ssCardBgD"
                      >
                        <option value="0.75">0.75×</option>
                        <option value="1">1.0×</option>
                        <option value="1.25">1.25×</option>
                        <option value="1.5">1.5×</option>
                      </select>
                    </label>

                    {/* Pitch */}
                    <label className="text-xs grid gap-1">
                      <span className="opacity-70">Pitch (visual)</span>
                      <select
                        value={pitch}
                        onChange={(e) => setPitch(id, e.target.value)}
                        className="px-2 py-1 rounded-md border border-ssCardBrd bg-white dark:bg-ssCardBgD"
                      >
                        <option value="0.9">Softer</option>
                        <option value="1.0">Normal</option>
                        <option value="1.1">Brighter</option>
                      </select>
                    </label>
                  </div>

                  {/* Loop Toggle */}
                  <label className="flex items-center gap-2 text-xs mt-1">
                    <input
                      type="checkbox"
                      checked={loop}
                      onChange={(e) => setLoop(id, e.target.checked)}
                    />
                    Loop this track
                  </label>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

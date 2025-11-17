// frontend/src/pages/SleepYouNeed.jsx
import { useRef, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function SleepYouNeed() {
  const [tracks, setTracks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [rates, setRates] = useState({});
  const [pitches, setPitches] = useState({});
  const [looping, setLooping] = useState({});
  const [loading, setLoading] = useState(true);

  const audioRefs = useRef({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/sleep`);
        const json = await res.json();
        if (json.ok) setTracks(json.data || []);
      } catch (err) {
        console.error("Sleep audio fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---- AUDIO CONTROLS ----
  const handlePlay = (id) => {
    Object.entries(audioRefs.current).forEach(([k, el]) => {
      if (k !== id && el && !el.paused) el.pause();
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
      setRates((prev) => ({ ...prev, [id]: Number(val) }));
    }
  };

  const setPitch = (id, val) => {
    setPitches((prev) => ({ ...prev, [id]: Number(val) }));
  };

  const setLoop = (id, val) => {
    const el = audioRefs.current[id];
    if (el) el.loop = !!val;
    setLooping((prev) => ({ ...prev, [id]: !!val }));
  };

  const downloadTrack = (filename) => {
    const url = `${API_BASE}/api/sleep/${encodeURIComponent(filename)}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // ---- SLEEP THEME GRADIENTS ----
  const gradients = [
    "from-[#2E3A87] to-[#4C5FC7]",     // Midnight calm
    "from-[#3B4DA3] to-[#8AA2FF]",     // Moon glow
    "from-[#25314D] to-[#496A9C]",     // Deep blue dusk
    "from-[#6A85B6] to-[#BAC8E0]",     // Dreamy soft blue
    "from-[#1E2348] to-[#4B4F81]",     // Night sky
    "from-[#5E72EB] to-[#7EA1FF]",     // Indigo mist
    "from-[#4A6FA5] to-[#A4C8FF]",     // Frozen twilight
    "from-[#647DEE] to-[#7F53AC]"      // Starry gradient
  ];

  return (
    <main className="min-h-screen bg-[#6C9BCF]  text-ssText dark:bg-ssBgD dark:text-ssNavyD px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-black dark:text-ssNavyD">
            The Sleep You Need
          </h1>
          <p className="opacity-80 text-sm text-black">
            Drift into peaceful, deep sleep with calming sounds & guided rest.
          </p>
        </header>

        {loading && <div>Loading peaceful sleep tracks...</div>}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {tracks.map((t, index) => {
            const id = `sleep_${index}`;
            const url = `${API_BASE}${t.url}`;
            const rate = rates[id] ?? 1.0;
            const pitch = pitches[id] ?? 1.0;
            const loop = looping[id] ?? false;
            const isActive = activeId === id;

            const gradientClass = gradients[index % gradients.length];

            return (
              <article
                key={id}
                className="rounded-2xl overflow-hidden border border-ssCardBrd 
                dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD shadow-ss flex flex-col"
              >

                {/* GORGEOUS GRADIENT HEADER */}
                <div className={`h-28 bg-gradient-to-r ${gradientClass} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-2 left-3 text-white drop-shadow-lg">
                    <div className="text-lg font-semibold">{t.title}</div>
                    <div className="text-xs opacity-90">Sleep Audio</div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-4 flex-1 flex flex-col gap-3">

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-ssAccent/40 text-ssNavy">
                      {t.source}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-ssAccent/40 text-ssNavy">
                      Sleep
                    </span>
                  </div>

                  {/* AUDIO */}
                  <audio
                    ref={(el) => (audioRefs.current[id] = el)}
                    className="w-full mt-1"
                    src={url}
                    controls
                    preload="none"
                    onPlay={() => setActiveId(id)}
                    onEnded={() => setActiveId(null)}
                  />

                  {/* CONTROLS */}
                  <div className="grid grid-cols-2 gap-2 mt-1">

                    {/* Play / Pause */}
                    <button
                      onClick={() => togglePlay(id)}
                      className={`px-3 py-2 rounded-lg text-white ${
                        isActive ? "bg-ssPrimaryH" : "bg-ssPrimary"
                      }`}
                    >
                      {isActive ? "Pause" : "Play"}
                    </button>

                    {/* Download */}
                    <button
                      onClick={() => downloadTrack(t.filename)}
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

                  {/* Loop */}
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

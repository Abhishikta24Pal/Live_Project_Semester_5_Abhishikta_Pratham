import { useRef, useState } from "react";
import { MEDITATIONS } from "../data/meditations";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function Meditation() {
  const [activeId, setActiveId] = useState(null);
  const [rates, setRates] = useState({});   // id -> rate
  const [pitches, setPitches] = useState({}); // id -> pitch (for completeness with native controls)
  const [looping, setLooping] = useState({}); // id -> boolean

  const audioRefs = useRef({}); // id -> HTMLAudioElement

  const handlePlay = (id) => {
    // pause others
    Object.entries(audioRefs.current).forEach(([k, el]) => {
      if (k !== id && el && !el.paused) el.pause();
    });
    setActiveId(id);
    const el = audioRefs.current[id];
    if (el) {
      el.play().catch(() => {});
    }
  };

  const handlePause = (id) => {
    const el = audioRefs.current[id];
    if (el) el.pause();
    if (activeId === id) setActiveId(null);
  };

  const togglePlay = (id) => {
    const el = audioRefs.current[id];
    if (!el) return;
    if (el.paused) handlePlay(id);
    else handlePause(id);
  };

  const setRate = (id, val) => {
    const el = audioRefs.current[id];
    if (el) {
      el.playbackRate = Number(val);
      setRates((s) => ({ ...s, [id]: Number(val) }));
    }
  };

  const setPitch = (id, val) => {
    // HTML5 <audio> has no pitch shift; we keep the control for future DSP,
    // but we reflect it visually so the user sees their choice.
    setPitches((s) => ({ ...s, [id]: Number(val) }));
  };

  const setLoop = (id, val) => {
    const el = audioRefs.current[id];
    if (el) el.loop = !!val;
    setLooping((s) => ({ ...s, [id]: !!val }));
  };

  const downloadTrack = (filename) => {
    const url = `${API_BASE}/api/audio/${encodeURIComponent(filename)}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-ssNavy dark:text-ssNavyD">
            Meditation & Breathing
          </h1>
          <p className="opacity-80 text-sm">
            Short, focused audios for calm, sleep, and clarity. Pick one and breathe with it.
          </p>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEDITATIONS.map((m) => {
            const url = `${API_BASE}/api/audio/${encodeURIComponent(m.filename)}`;
            const isActive = activeId === m.id;
            const rate = rates[m.id] ?? 1.0;
            const pitch = pitches[m.id] ?? 1.0;
            const loop = looping[m.id] ?? false;

            return (
              <article
                key={m.id}
                className="rounded-2xl overflow-hidden border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD shadow-ss flex flex-col"
              >
                {/* Cover */}
                <div className={`h-28 bg-gradient-to-r ${m.cover} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-2 left-3 text-white drop-shadow-lg">
                    <div className="text-lg font-semibold">{m.title}</div>
                    <div className="text-xs opacity-90">{m.duration}</div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-ssAccent/40 text-ssNavy dark:text-ssNavyD"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Player */}
                  <audio
                    ref={(el) => (audioRefs.current[m.id] = el)}
                    className="w-full mt-1"
                    src={url}
                    controls
                    preload="none"
                    onPlay={() => setActiveId(m.id)}
                    onEnded={() => setActiveId(null)}
                    // playbackRate is set via control below
                  />

                  {/* Controls */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => togglePlay(m.id)}
                      className={`px-3 py-2 rounded-lg text-white ${
                        isActive ? "bg-ssPrimaryH" : "bg-ssPrimary"
                      }`}
                    >
                      {isActive ? "Pause" : "Play"}
                    </button>

                    <button
                      onClick={() => downloadTrack(m.filename)}
                      className="px-3 py-2 rounded-lg bg-ssCardBrd hover:opacity-90"
                    >
                      Download
                    </button>

                    <label className="text-xs grid gap-1">
                      <span className="opacity-70">Speed</span>
                      <select
                        value={rate}
                        onChange={(e) => setRate(m.id, e.target.value)}
                        className="px-2 py-1 rounded-md border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD"
                      >
                        <option value="0.75">0.75×</option>
                        <option value="1">1.0×</option>
                        <option value="1.25">1.25×</option>
                        <option value="1.5">1.5×</option>
                      </select>
                    </label>

                    <label className="text-xs grid gap-1">
                      <span className="opacity-70">Pitch (visual)</span>
                      <select
                        value={pitch}
                        onChange={(e) => setPitch(m.id, e.target.value)}
                        className="px-2 py-1 rounded-md border border-ssCardBrd dark:border-ssCardBrd bg-white dark:bg-ssCardBgD"
                      >
                        <option value="0.9">Softer</option>
                        <option value="1.0">Normal</option>
                        <option value="1.1">Brighter</option>
                      </select>
                    </label>
                  </div>

                  <label className="flex items-center gap-2 text-xs mt-1">
                    <input
                      type="checkbox"
                      checked={loop}
                      onChange={(e) => setLoop(m.id, e.target.checked)}
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

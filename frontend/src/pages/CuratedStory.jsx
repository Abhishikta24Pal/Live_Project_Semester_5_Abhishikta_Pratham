// frontend/src/pages/CuratedStory.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { STORIES, SUPPORTED_LANGS } from "../data/curatedStories";

export default function CuratedStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const storyIndex = Math.max(
    0,
    STORIES.findIndex((s) => s.id === id)
  );
  const story = STORIES[storyIndex] ?? STORIES[0];

  const [lang, setLang] = useState("en");
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);

  const utterRef = useRef(null);
  const voicesRef = useRef([]);

  // load voices once (and onvoiceschanged)
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const voice = useMemo(() => {
    const prefTag = SUPPORTED_LANGS.find((l) => l.code === lang)?.bcp47 || "en-IN";
    const all = voicesRef.current || [];
    // pick best match by language prefix
    const exact = all.find(v => v.lang?.toLowerCase() === prefTag.toLowerCase());
    if (exact) return exact;
    const prefix = prefTag.split("-")[0];
    const starts = all.find(v => v.lang?.toLowerCase().startsWith(prefix));
    return starts || all.find(v => v.lang?.toLowerCase().startsWith("en")) || null;
  }, [lang, voicesRef.current]);

  const body = story.bodies[lang] || story.bodies["en"];
  const title = story.titles[lang] || story.titles["en"];

  function stopTTS() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    utterRef.current = null;
    setIsPlaying(false);
  }

  function playTTS() {
    stopTTS();
    const u = new SpeechSynthesisUtterance(`${title}. ${body}`);
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    utterRef.current = u;
    setIsPlaying(true);
    window.speechSynthesis.speak(u);
  }

  function pauseResume() {
    if (!window.speechSynthesis.speaking) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    } else {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  }

  function downloadText() {
    const text = `# ${title}\n\n${body}\n`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (story.id + "_" + lang).replace(/[^\w\-]+/g, "_") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const prevId = STORIES[(storyIndex - 1 + STORIES.length) % STORIES.length].id;
  const nextId = STORIES[(storyIndex + 1) % STORIES.length].id;

  return (
    <main className="min-h-screen px-4 py-6 bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Vibrant hero */}
        <div className={`rounded-3xl p-6 text-white shadow-lg bg-gradient-to-br ${story.cover}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold drop-shadow">
                {title}
              </h1>
              <p className="opacity-90">Curated healing story • Guardian</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="rounded-xl px-3 py-2 text-sm text-ssNavy bg-white shadow"
                title="Language"
              >
                {SUPPORTED_LANGS.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>

              <Link
                to="/anon/stories"
                className="rounded-xl bg-white/90 hover:bg-white text-ssNavy px-3 py-2 text-sm shadow"
              >
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* Reader card */}
        <section className="rounded-3xl border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD p-6 shadow-sm">
          <article className="prose dark:prose-invert max-w-none whitespace-pre-wrap leading-7">
            {body}
          </article>
        </section>

        {/* Controls */}
        <section className="rounded-3xl border border-ssCardBrd dark:border-ssCardBrd bg-ssCardBg dark:bg-ssCardBgD p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={playTTS}
              className="px-4 py-2 rounded-xl text-white bg-ssPrimary hover:bg-ssPrimaryH"
            >
              {isPlaying ? "Restart" : "Play"}
            </button>

            <button
              onClick={pauseResume}
              className="px-4 py-2 rounded-xl bg-ssAccent text-ssNavy hover:opacity-90"
            >
              {window.speechSynthesis.paused ? "Resume" : "Pause"}
            </button>

            <button
              onClick={stopTTS}
              className="px-4 py-2 rounded-xl bg-ssCardBrd hover:opacity-90"
            >
              Stop
            </button>

            <button
              onClick={downloadText}
              className="px-4 py-2 rounded-xl text-white bg-ssPrimary hover:bg-ssPrimaryH"
            >
              Download Text
            </button>
          </div>

          {/* Sliders */}
          <div className="grid sm:grid-cols-3 gap-4 mt-5">
            <LabeledSlider label={`Rate ${rate.toFixed(2)}`} min={0.5} max={1.5} step={0.05} value={rate} onChange={setRate} />
            <LabeledSlider label={`Pitch ${pitch.toFixed(2)}`} min={0.5} max={2} step={0.05} value={pitch} onChange={setPitch} />
            <LabeledSlider label={`Volume ${volume.toFixed(2)}`} min={0.2} max={1} step={0.05} value={volume} onChange={setVolume} />
          </div>

          {/* Tip about voices */}
          <p className="text-xs opacity-70 mt-3">
            Tip: Voice availability differs by browser/OS. We pick the best match for the selected language and fall back gracefully.
          </p>
        </section>

        {/* Prev / Next */}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 rounded-xl bg-ssCardBg dark:bg-ssCardBgD border border-ssCardBrd hover:opacity-90"
            onClick={() => navigate(`/anon/stories/curated/${prevId}`)}
          >
            ← Previous
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-ssCardBg dark:bg-ssCardBgD border border-ssCardBrd hover:opacity-90"
            onClick={() => navigate(`/anon/stories/curated/${nextId}`)}
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}

function LabeledSlider({ label, min, max, step, value, onChange }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs opacity-70">{label}</span>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-ssPrimary"
      />
    </label>
  );
}

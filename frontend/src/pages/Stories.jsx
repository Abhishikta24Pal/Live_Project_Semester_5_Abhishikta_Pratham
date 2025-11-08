import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Play } from "lucide-react";

// 12–18 pleasant faux covers using CSS gradients
const GRADS = [
  ["from-fuchsia-500 to-rose-500"], ["from-sky-500 to-indigo-500"],
  ["from-emerald-500 to-teal-500"], ["from-amber-500 to-orange-600"],
  ["from-violet-500 to-fuchsia-600"], ["from-rose-400 to-red-500"],
  ["from-cyan-500 to-blue-600"], ["from-lime-500 to-emerald-600"],
  ["from-indigo-500 to-purple-600"], ["from-teal-500 to-cyan-600"],
  ["from-amber-400 to-pink-500"], ["from-blue-500 to-indigo-700"],
  ["from-pink-400 to-violet-600"], ["from-slate-500 to-zinc-700"],
  ["from-emerald-400 to-lime-600"], ["from-sky-400 to-cyan-600"],
];

const curated = Array.from({length: 12}).map((_,i)=>({
  id: `curated-${i+1}`,
  title: [
    "Quiet Morning", "Steady Roots", "Soft Courage", "Holding a Memory",
    "The Gentle Turn", "Waves Slow Down", "Lantern in Fog", "Room with Sun",
    "When it feels too much", "A heart learning to mend", "Growing your roots",
    "Cooling the coals"
  ][i%12],
  minutes: 6,
  tagline: ["A small calm story.","Breath, then the next step.","Warm light, steady pace."][i%3],
}));

export default function Stories() {
  const navigate = useNavigate();
  const cards = useMemo(()=>curated, []);

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Human Stories</h1>
          <button
            onClick={()=>navigate("/anon/stories/generate")}
            className="inline-flex items-center gap-2 rounded-xl bg-ssPrimary text-white px-4 py-2 shadow-ss hover:opacity-95">
            <Sparkles size={18}/> Generate new
          </button>
        </div>
        <p className="text-sm opacity-80 mb-8">Pick a soothing short story. Flip pages; narration follows automatically.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx)=>(
            <Link
              key={c.id}
              to={`/anon/stories/${c.id}`}
              state={{ curated: true, title: c.title, minutes: c.minutes }}
              className="group rounded-2xl bg-ssCardBg border border-ssCardBrd overflow-hidden shadow-ss hover:-translate-y-0.5 transition"
            >
              <div className={`h-40 bg-gradient-to-br ${GRADS[idx%GRADS.length][0]}`} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <span className="text-xs opacity-70">~{c.minutes} min</span>
                </div>
                <p className="text-sm opacity-80 mt-1">{c.tagline}</p>
                <div className="mt-4 flex items-center gap-2 text-ssPrimary">
                  <Play size={16}/><span className="text-xs">Open</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

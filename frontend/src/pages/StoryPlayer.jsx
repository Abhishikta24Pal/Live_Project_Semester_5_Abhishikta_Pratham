import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Play, Pause, Square, SkipBack, SkipForward, Settings2, Volume2, Sparkles } from "lucide-react";
import useTTS from "../shared/useTTS";

const API = "http://localhost:5000/api/stories/generate";

export default function StoryPlayer({ generate = false }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { voices, selected, setSelected, rate, setRate, pitch, setPitch, speak, stop, saveVoice } = useTTS();

  const [story, setStory] = useState(null);
  const [page, setPage] = useState(0);
  const [auto, setAuto] = useState(true);
  const [loading, setLoading] = useState(generate);

  // generate new story
  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!generate) { // demo curated content: 6 blank pages with filler text
        const title = location.state?.title || "Soft Story";
        const pages = Array.from({length: 6}).map((_,i)=>({ id:i+1, text:`Page ${i+1}. This is a placeholder story. Replace with Gemini when ready.`}));
        const cover_palette = ["#6366f1", "#ec4899"];
        if (!ignore) setStory({ id: id||"demo", title, est_minutes: 6, pages, image_plan:{cover_palette, pages: pages.map(()=>({prompt:"abstract gradient"}))}});
        return;
      }
      try {
        setLoading(true);
        const body = { mood: "grounding after overwhelm", minutes: 6, style: "warm and gentle", pages: 8 };
        const resp = await fetch(API, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)});
        const data = await resp.json();
        if (!resp.ok || !data?.ok) throw new Error(data?.error || "Failed");
        if (!ignore) setStory(data.story);
      } catch (e) {
        console.error(e);
        if (!ignore) setStory(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; stop(); };
  }, [generate, id]);

  // auto speak on page change
  useEffect(() => {
    if (!story || !story.pages?.[page]) return;
    if (auto) speak(story.pages[page].text);
  }, [story, page, auto, selected, rate, pitch]);

  const grad = useMemo(()=>{
    const pal = story?.image_plan?.cover_palette || ["#6366f1","#ec4899"];
    return { background: `linear-gradient(135deg, ${pal[0]} 0%, ${pal[1]} 100%)` };
  }, [story]);

  function next() {
    if (!story) return;
    setPage(p => Math.min(p+1, story.pages.length-1));
  }
  function prev() {
    if (!story) return;
    setPage(p => Math.max(p-1, 0));
  }

  return (
    <main className="min-h-screen bg-ssBg text-ssText dark:bg-ssBgD dark:text-ssNavyD">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold">{story?.title || (generate ? "Generating…" : "Story")}</h1>
          <button onClick={()=>navigate("/anon/stories")}
                  className="rounded-xl border border-ssCardBrd px-3 py-2 hover:bg-ssCardBg">
            Close
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cover / Visual */}
          <div className="rounded-2xl border border-ssCardBrd shadow-ss overflow-hidden">
            <div className="h-64 md:h-80" style={grad}/>
            <div className="p-4 flex items-center gap-3">
              <button className="p-3 rounded-xl bg-ssPrimary text-white" onClick={()=>speak(story?.pages?.[page]?.text || "")}><Play/></button>
              <button className="p-3 rounded-xl bg-ssCardBg" onClick={stop}><Square/></button>
              <button className="p-3 rounded-xl bg-ssCardBg" onClick={prev}><SkipBack/></button>
              <button className="p-3 rounded-xl bg-ssCardBg" onClick={next}><SkipForward/></button>

              <label className="ml-4 text-sm flex items-center gap-2">
                <input type="checkbox" className="accent-ssPrimary" checked={auto} onChange={e=>setAuto(e.target.checked)}/>
                Autoplay
              </label>

              <div className="ml-auto flex items-center gap-2 text-sm">
                <Settings2 size={16}/>
                <select
                  value={selected?.name || ""}
                  onChange={e=>{
                    const v = voices.find(x=>x.name===e.target.value);
                    setSelected(v); if (v) saveVoice(v.name);
                  }}
                  className="rounded-xl bg-transparent border border-ssCardBrd px-3 py-2"
                >
                  <option value="">System default</option>
                  {voices.map(v=>(
                    <option key={v.name} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sliders */}
            <div className="px-4 pb-4 flex items-center gap-6">
              <div className="flex items-center gap-2"><span className="text-xs opacity-80">Rate</span>
                <input type="range" min="0.7" max="1.3" step="0.05" value={rate} onChange={e=>setRate(parseFloat(e.target.value))}/>
              </div>
              <div className="flex items-center gap-2"><span className="text-xs opacity-80">Pitch</span>
                <input type="range" min="0.8" max="1.4" step="0.05" value={pitch} onChange={e=>setPitch(parseFloat(e.target.value))}/>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="rounded-2xl border border-ssCardBrd shadow-ss p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Pages</h2>
              {generate && (
                <button className="inline-flex items-center gap-2 text-ssPrimary"
                        onClick={()=>navigate(0)}>
                  <Sparkles size={16}/> Regenerate
                </button>
              )}
            </div>

            {loading && <div className="p-6 text-sm opacity-80">Generating story with Gemini…</div>}

            {!loading && story && (
              <>
                <div className="rounded-xl bg-ssCardBg p-4 min-h-[220px] whitespace-pre-wrap leading-relaxed">
                  {story.pages[page]?.text}
                </div>
                <div className="mt-3 text-xs opacity-70">Page {page+1} / {story.pages.length}</div>

                <div className="mt-4 flex gap-3">
                  <button onClick={prev} className="rounded-xl border border-ssCardBrd px-3 py-2">Prev</button>
                  <button onClick={next} className="rounded-xl bg-ssPrimary text-white px-3 py-2">Next</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

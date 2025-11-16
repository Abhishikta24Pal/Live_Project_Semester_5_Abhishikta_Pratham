import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SYMPTOMS } from '../data/anxietySymptoms';


export default function AnxietySelector() {
const navigate = useNavigate();


return (
<main className="min-h-screen p-6 md:p-10 bg-[#6C9BCF] dark:bg-[#1C1F2A]">
<div className="max-w-4xl mx-auto">
<h1 className="text-2xl md:text-3xl font-semibold mb-2 text-black dark:text-ssNavyD">What are you feeling right now?</h1>
<p className="mb-6 text-sm opacity-80">Choose a symptom — we’ll show quick, friendly ways to help.</p>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
{SYMPTOMS.map((s) => (
<button
key={s.id}
onClick={() => navigate(`/anxiety/cope/${s.id}`)}
className={`rounded-2xl p-5 flex flex-col items-start gap-3 shadow-sm transform hover:scale-[1.02] transition ${s.color}`}
aria-label={s.title}
>
<div className="text-4xl">{s.emoji}</div>
<div className="mt-1 font-semibold text-ssNavy dark:text-ssNavyD">{s.title}</div>
<div className="text-xs opacity-70">Tap for coping options</div>
</button>
))}
</div>
</div>
</main>
);
}
import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_INSTRUCTIONS = `
You write calm, encouraging 5–7 minute micro-stories for mental wellbeing.
Tone: warm, human, hopeful. Avoid clinical terms. Use short paragraphs.

Return STRICT JSON with this exact schema:
{
  "title": "string",
  "summary": "1-2 lines",
  "est_minutes": 6,
  "pages": [
    { "text": "page text (2–5 short paragraphs)" }
  ],
  "image_plan": {
    "cover_palette": ["#a855f7", "#ec4899"],
    "pages": [
      { "prompt": "brief image prompt for this page" }
    ]
  }
}
`;

function payloadFor(message) {
  return {
    contents: [
      {
        parts: [
          { text: SYSTEM_INSTRUCTIONS },
          { text: message }
        ]
      }
    ]
  };
}

router.post("/generate", async (req, res) => {
  try {
    const {
      mood = "calm focus",
      minutes = 6,
      style = "gentle, reflective",
      pages = 8
    } = req.body || {};

    const userPrompt = `
Mood: ${mood}
Duration target: ${minutes} minutes
Style cues: ${style}
Target pages: ${pages}

Write a single continuous story that splits naturally across ${pages} pages.
Keep each page 120–220 words, ending on a soft beat that invites the next.
Also propose a simple image prompt per page (no people descriptions that could be sensitive).
`;

    const resp = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadFor(userPrompt))
    });

    if (!resp.ok) {
      const errTxt = await resp.text();
      return res.status(502).json({ ok: false, error: "Gemini error", details: errTxt });
    }

    const data = await resp.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // try to pull JSON from possibly fenced markdown
    const jsonStr =
      raw.match(/\{[\s\S]*\}$/)?.[0] ||
      raw.replace(/^```json|^```/gm, "").replace(/```$/,"");

    let story;
    try { story = JSON.parse(jsonStr); }
    catch { return res.status(500).json({ ok:false, error:"Bad JSON from model", raw }); }

    // Guard rails
    if (!Array.isArray(story.pages) || story.pages.length === 0) {
      return res.status(500).json({ ok:false, error:"No pages returned", story });
    }

    // Normalize lengths and basic ids
    story.id = cryptoRandomId();
    story.est_minutes = story.est_minutes || minutes;
    story.pages = story.pages.map((p, i) => ({
      id: i + 1,
      text: p.text?.trim() || ""
    }));
    story.image_plan = story.image_plan || { cover_palette: ["#6366f1","#ec4899"], pages: story.pages.map(()=>({prompt:"soft abstract gradient, soothing"})) };

    return res.json({ ok: true, story });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error:e.message });
  }
});

function cryptoRandomId() {
  return "s_" + Math.random().toString(36).slice(2, 10);
}

export default router;

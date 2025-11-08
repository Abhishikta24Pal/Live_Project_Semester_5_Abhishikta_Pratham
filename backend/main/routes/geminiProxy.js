import express from "express";
import fetch from "node-fetch"; 
const router = express.Router();
router.post("/anon/gemini", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });
    // API INTEGRATION
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const API_KEY = process.env.GEMINI_API_KEY;
    //RESPONSE FORMAT
    const payload = ({
            contents: [
                {
                    parts: [
                        {
                            text: `You are a concise and empathetic mental health assistant. Please respond in no more than 5 short sentences and keep it easy to understand.\nUser: ${message}`
                        }
                    ]
                }
            ]
        }) 

    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Gemini API error:", text);
      return res.status(502).json({ error: "Gemini API request failed", details: text });
    }
    const data = await resp.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

    res.json({ ok: true, reply });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});
export default router;

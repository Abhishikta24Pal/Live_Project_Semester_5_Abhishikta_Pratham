// backend/main/routes/audioRoutes.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const AUDIO_DIR = path.resolve("./audio");

// Map filenames to display titles
const audioTitleMap = {
  "overwhelming.mp3": "Overwhelming Feeling",
  "losingsomeone.mp3": "Losing Someone",
  "missingsomeone.mp3": "Missing Someone",
  "heartbreak.mp3": "Heartbreak",
  "selfesteem.mp3": "Self Esteem",
  "familydrama.mp3": "Family Drama",
  "endfriendship.mp3": "Ending Friendship",
  "endcompare.mp3": "End Comparison",
  "endanger.mp3": "End Anger",
  "personaleffect.mp3": "Be Kind to Yourself"
};

// 🎵 Route 1: List all audios
router.get("/audio", async (req, res) => {
  try {
    const files = await fs.promises.readdir(AUDIO_DIR);
    const mp3s = files.filter(f => /\.(mp3)$/i.test(f));

    const data = mp3s.map(name => ({
      name,
      title: audioTitleMap[name] || name.replace(/\.mp3$/i, ""),
      url: `/api/audio/file/${encodeURIComponent(name)}`
    }));

    res.json({ ok: true, data });
  } catch (err) {
    console.error("Audio listing error:", err);
    res.status(500).json({ ok: false, error: "Failed to list audio files" });
  }
});

// 🎧 Route 2: Stream audio file
router.get("/audio/file/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(AUDIO_DIR, filename);

  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mpeg",
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

export default router;

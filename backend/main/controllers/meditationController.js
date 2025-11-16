import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// meditation audio folder
const audioDir = path.join(__dirname, "../audio");

export const listMeditations = (req, res) => {
  if (!fs.existsSync(audioDir)) {
    console.error("Meditation audio directory not found:", audioDir);
    return res.json({ ok: true, data: [] });
  }

  const files = fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3"));

  const data = files.map((name) => ({
    name,
    title: name.replace(".mp3", "").replaceAll("_", " "),
    url: `/api/audio/${encodeURIComponent(name)}`
  }));

  res.json({ ok: true, data });
};

export const streamMeditation = (req, res) => {
  const filePath = path.join(audioDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Audio not found");
  }
  res.sendFile(filePath);
};

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sleepAudioDir = path.join(__dirname, "../audio_for_sleep");

// Fetch sleep audios
export const getSleepAudios = (req, res) => {
  try {
    if (!fs.existsSync(sleepAudioDir)) {
      console.error("Sleep audio directory not found:", sleepAudioDir);
      return res.json({ ok: true, data: [] });
    }

    const files = fs.readdirSync(sleepAudioDir).filter(f => f.endsWith(".mp3"));
    const data = files.map(name => ({
      title: name.replace(".mp3", ""),
      url: `/api/sleep/audio/${encodeURIComponent(name)}`,
      source: "sleep"
    }));

    res.json({ ok: true, data });
  } catch (err) {
    console.error("Error fetching sleep audios:", err);
    res.status(500).json({ ok: false, error: "Error fetching sleep audio list" });
  }
};

// Stream single audio
export const streamSleepAudio = (req, res) => {
  const filePath = path.join(sleepAudioDir, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Sleep audio not found");
  res.sendFile(filePath);
};

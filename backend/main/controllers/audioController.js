import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// AUDIO DIRECTORY
const audioDir = path.join(__dirname, "../audio_daily_life");

// LIST LOCAL AUDIOS
export const getLocalAudios = () => {
  if (!fs.existsSync(audioDir)) {
    console.error("Audio directory not found:", audioDir);
    return [];
  }

  const files = fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3"));
  return files.map((name) => ({
    title: name.replace(".mp3", "").replaceAll("_", " "),
    url: `/api/audio_daily_life/${name}`,
    source: "local",
  }));
};

// MAIN ENDPOINT: GET ALL
export const getAllAudios = async (req, res) => {
  try {
    const local = getLocalAudios();
    res.json({ ok: true, data: local });
  } catch (err) {
    console.error("Error fetching audios:", err);
    res.status(500).json({ error: "Error fetching audio list" });
  }
};

// STREAM AUDIO
export const streamAudio = (req, res) => {
  const filePath = path.join(audioDir, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Audio not found");
  res.sendFile(filePath);
};

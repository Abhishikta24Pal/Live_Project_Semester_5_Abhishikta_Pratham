import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//AUDIO FETCHING
const audioDir = path.join(__dirname, "../audio");

//OPTIONAL FIREBASE LATER
const FIREBASE_BASE_URL = process.env.FIREBASE_BASE_URL || "";

export const getLocalAudios = () => {
  if (!fs.existsSync(audioDir)) {
    console.error("Audio directory not found:", audioDir);
    return [];
  }

  const files = fs.readdirSync(audioDir).filter((f) => f.endsWith(".mp3"));
  return files.map((name) => ({
    title: name.replace(".mp3", "").replaceAll("_", " "),
    url: `/api/audio/${name}`,
    source: "local",
  }));
};

export const getCloudAudios = async () => {
  if (!FIREBASE_BASE_URL) return [];
  return [];
};

export const getAllAudios = async (req, res) => {
  try {
    const local = getLocalAudios();
    const cloud = await getCloudAudios();
    res.json({ ok: true, data: [...local, ...cloud] });
  } catch (err) {
    console.error("Error fetching audios:", err);
    res.status(500).json({ error: "Error fetching audio list" });
  }
};

export const streamAudio = (req, res) => {
  const filePath = path.join(audioDir, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Audio not found");
  res.sendFile(filePath);
};

import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// LOCAL AUDIO DIRECTORY
const __dirname = path.resolve();
const audioDir = path.resolve("./audio");

// Example Firebase base URL placeholder
const FIREBASE_BASE_URL = process.env.FIREBASE_BASE_URL || "";

export const getLocalAudios = () => {
  const files = fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3"));
  return files.map(name => ({
    title: name.replace(".mp3", "").replaceAll("_", " "),
    url: `/api/audio/${name}`,
    source: "local",
  }));
};

export const getCloudAudios = async () => {
  // For now, return empty or mock list.
  // Later we can integrate Firebase SDK or Supabase client.
  if (!FIREBASE_BASE_URL) return [];
  return [
    {
      title: "Overwhelming Day",
      url: `${FIREBASE_BASE_URL}/overwhelming_day.mp3`,
      source: "firebase",
    },
  ];
};

export const getAllAudios = async (req, res) => {
  try {
    const local = getLocalAudios();
    const cloud = await getCloudAudios();
    res.json([...local, ...cloud]);
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

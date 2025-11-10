import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiProxy from "./routes/geminiProxy.js";
import storyGen from "./routes/storyGen.js";
import audioRoutes from "./routes/audioRoutes.js";
import sleepRoutes from "./routes/sleepRoutes.js";
import curatedStories from "./routes/curatedStories.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//ROOT CHECK
app.get("/", (req, res) => {
  res.send("Main backend server is running...");
});

//ROUTES
app.use("/api", geminiProxy);
app.use("/api", audioRoutes);
app.use("/api", storyGen);
app.use("/api", sleepRoutes);
app.use("/api", curatedStories);

//START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Main backend running on port ${PORT}`));

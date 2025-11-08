import express from "express";
import cors from "cors";
import geminiProxy from "./routes/geminiProxy.js";
import audioRoutes from "./routes/audioRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
//BACKEND RUNNING
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main backend server is running...");
});

//AI SUPPORT BUDDY
app.use("/api", geminiProxy);

//USUAL DAILY LIFE
app.use("/api", audioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Main backend running on port ${PORT}`));




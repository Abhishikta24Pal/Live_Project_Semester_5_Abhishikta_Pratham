import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main backend server is running...");
});

// Placeholder route (you’ll replace with routes later)
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Test API working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Main backend running on port ${PORT}`));

import express from "express";
import cors from "cors";
import geminiProxy from "./routes/geminiProxy.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main backend server is running...");
});


app.use("/api", geminiProxy);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Main backend running on port ${PORT}`));






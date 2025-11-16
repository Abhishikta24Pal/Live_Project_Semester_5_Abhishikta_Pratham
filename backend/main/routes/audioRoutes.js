// backend/main/routes/audioRoutes.js
import { Router } from "express";
import { getAllAudios, streamAudio } from "../controllers/audioController.js";

const router = Router();

router.get("/audio_daily_life", getAllAudios);

router.get("/audio_daily_life/:filename", streamAudio);

export default router;

import express from "express";
import { getSleepAudios, streamSleepAudio } from "../controllers/sleepController.js";

const router = express.Router();

router.get("/sleep", getSleepAudios);
router.get("/sleep/audio/:filename", streamSleepAudio);

export default router;

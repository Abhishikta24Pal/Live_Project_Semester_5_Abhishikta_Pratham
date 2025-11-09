import express from "express";
import { getAllAudios, streamAudio } from "../controllers/audioController.js";

const router = express.Router();

//FETCH ALL AUDIO
router.get("/audio", getAllAudios);

//STREAM AUDIO
router.get("/audio/:filename", streamAudio);

export default router;

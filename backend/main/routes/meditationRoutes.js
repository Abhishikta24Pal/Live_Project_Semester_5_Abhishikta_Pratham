import express from "express";
import { listMeditations, streamMeditation } from "../controllers/meditationController.js";

const router = express.Router();

router.get("/", listMeditations);
router.get("/:filename", streamMeditation);

export default router;

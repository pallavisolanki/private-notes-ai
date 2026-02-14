//backend\src\routes\note.routes.js
import express from "express";
import {
  createNote,
  unlockNote,
  summarizeNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/", createNote);
router.post("/:id/unlock", unlockNote);
router.post("/:id/summarize", summarizeNote);

export default router;
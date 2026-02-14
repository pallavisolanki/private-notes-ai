//backend\src\controllers\note.controller.js
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import prisma from "../services/prisma.js";
import { summarizeWithAI } from "../services/ai.service.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Note cannot be empty.",
      });
    }

    if (content.length > 500) {
      return res.status(400).json({ error: "Note must be under 500 characters." });
    }

    const password = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const note = await prisma.note.create({
      data: {
        content,
        password: hashedPassword,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });


    return res.status(201).json({
      success: true,
      data: {
        noteId: note.id,
        url: `${process.env.FRONTEND_URL}/note/${note.id}`,
        password,
      },
    });

  } catch (err) {
    console.error("Create note error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create note.",
    });
  }
};

// UNLOCK NOTE
export const unlockNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    const isValid = await bcrypt.compare(password, note.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    if (note.expiresAt && note.expiresAt < new Date()) {
      return res.status(410).json({
        success: false,
        message: "Note has expired.",
      });
    }


    return res.json({
      success: true,
      data: {
        content: note.content,
      },
    });
  } catch (err) {
    console.error("Unlock note error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to unlock note.",
    });
  }
};

// SUMMARIZE NOTE (secured + caching)
export const summarizeNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    const isValid = await bcrypt.compare(password, note.password);

    if (!isValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    if (note.summary) {
      return res.json({
        success: true,
        data: {
          summary: note.summary,
          cached: true,
        },
      });
    }

    const summary = await summarizeWithAI(note.content);

    await prisma.note.update({
      where: { id },
      data: { summary },
    });

    return res.json({
      success: true,
      data: {
        summary,
        cached: false,
      },
    });


  } catch (err) {
    console.error("Summarize error:", err);
    return res.status(500).json({
      success: false,
      message: "AI summarization failed.",
    });
  }
};

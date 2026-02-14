//backend\src\index.js
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import noteRoutes from "./routes/note.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Private Notes API running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});



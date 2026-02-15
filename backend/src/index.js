// backend/src/index.js
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/note.routes.js";

dotenv.config();

const app = express();

// -----------------------------
// 1️⃣ Rate Limiting
// -----------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  }
});

app.use(limiter);

// -----------------------------
// 2️⃣ CORS
// -----------------------------
app.use(cors({
  origin: "https://private-notes-ai.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// -----------------------------
// 3️⃣ Body parser
// -----------------------------
app.use(express.json());

// -----------------------------
// 4️⃣ Routes
// -----------------------------
app.use("/api/notes", noteRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ success: true, message: "Private Notes API running" });
});

// -----------------------------
// 5️⃣ Handle 404 for unknown routes
// -----------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

// -----------------------------
// 6️⃣ Global Error Handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack); // logs for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// -----------------------------
// 7️⃣ Start server
// -----------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

📝 Private Notes with AI Summary

A secure full-stack web application that allows users to create private notes, share them via a unique link and password, and generate AI-powered summaries after unlocking the note.

🚀 Tech Stack
🔹 Backend

Node.js

Express

PostgreSQL

Prisma

Hugging Face (BART summarization model)

🔹 Frontend

React (powered by Vite)

Tailwind CSS

Axios

✨ Features

Create private notes (≤ 500 characters)

Auto-generated unique shareable URL

Secure password-protected access

24-hour automatic note expiry

AI-generated summary (3–5 bullet points)

Summary caching (stored after first generation)

Rate limiting on AI endpoint

Copy-to-clipboard functionality

Structured API error handling

Graceful handling of AI inference warm-up

🔐 API Behavior
1️⃣ Create Note

Validates input (non-empty, ≤ 500 characters)

Generates:

Unique note ID

Secure random password

Expiry timestamp (24 hours)

Returns structured JSON response

2️⃣ View Note

Requires password verification

Returns:

200 → Note content (on success)

401 → Invalid password

404 → Note not found

410 → Note expired

3️⃣ Summarize Note

AI call handled exclusively on backend

Uses Hugging Face BART model

Returns cached summary if already generated

Handles:

Loading states

API failures

Invalid/empty AI responses

⚙️ Setup Instructions
🔹 Backend Setup
cd backend
npm install


Create .env file inside backend/:

DATABASE_URL=your_postgres_url
FRONTEND_URL=http://localhost:5173
HF_API_KEY=your_key


Run backend:

npx prisma migrate dev
npm run dev

🔹 Frontend Setup
cd frontend
npm install
npm run dev

🧠 AI Integration

LLM request handled strictly from backend (never from frontend)

Uses Hugging Face BART summarization model

Summary normalized into clean bullet-point format

Summary cached in database to avoid repeated inference

Handles model cold start (warm-up)

Graceful fallback for AI failures

🛠️ Architectural Decisions

Prisma ORM for type-safe database access

Password verification before note retrieval

Expiry validation enforced at database query level

Summary caching to optimize performance and cost

Structured error response pattern for consistent frontend handling

Rate limiting to prevent abuse of AI endpoint

🔮 Future Improvements

Encrypt notes at rest

Hash passwords using bcrypt

Background job to clean expired notes

Add automated unit & integration tests

Add request logging and monitoring

Improve prompt engineering for better summaries

Dockerize the application

Optional self-destruct after first read

Private Notes with AI Summary

A full-stack application that allows users to create secure private notes, share them using a unique link and password, and generate AI-powered summaries after unlocking.

Tech Stack
Backend

Node.js

Express

PostgreSQL

Prisma ORM

Hugging Face Inference API (BART)

Frontend

React (Vite)

Tailwind CSS

Axios

Features

Create private note (≤ 500 chars)

Password-protected access

24-hour expiry

AI-generated summary (3–5 bullet points)

Summary caching

Rate limiting

Copy-to-clipboard

Structured error handling

Setup Instructions
Backend
cd backend
npm install


Create .env:

DATABASE_URL=your_postgres_url
FRONTEND_URL=http://localhost:5173
HF_API_KEY=your_key


Run:

npx prisma migrate dev
npm run dev

Frontend
cd frontend
npm install
npm run dev

AI Integration

AI call is made from backend only.

Summary normalized into bullet format.

Results cached in DB.

Handles inference warmup and API errors.

Future Improvements

End-to-end encryption

Configurable expiry

Delete-after-read

Dockerization

Add automated tests

Switch to instruction-tuned LLM

Save.

Commit again.

📝 Private Notes with AI Summary

A full-stack application that allows users to create secure private notes, share them using a unique link and password, and generate AI-powered summaries after unlocking.

🚀 Tech Stack
🔹 Backend

Node.js

Express

PostgreSQL

Prisma ORM

Hugging Face Inference API (BART)

🔹 Frontend

React (Vite)

Tailwind CSS

Axios

## Features
-Create private note (≤ 500 characters)
-Password-protected access
-24-hour expiry
-AI-generated summary (3–5 bullet points)
-Summary caching
-Rate limiting
-Copy-to-clipboard
-Structured error handling


⚙️ Setup Instructions
🔹 Backend Setup
cd backend
npm install

Create .env file inside backend/:
DATABASE_URL=your_postgres_url
FRONTEND_URL=http://localhost:5173
HF_API_KEY=your_key

Run Backend
npx prisma migrate dev
npm run dev

🔹 Frontend Setup
cd frontend
npm install
npm run dev


## AI Integration

-AI request is handled from backend only
-Uses Hugging Face BART model
-Summary normalized into clean bullet format
-Results cached in database
-Handles inference warm-up
-Graceful API error handling

## Future Improvements

- Add note expiry (time-based auto deletion)
- Add rate limiting for summarization endpoint
- Add encryption at rest for notes
- Add hashing for passwords
- Add unit and integration tests
- Add analytics for note views
- Improve prompt engineering for better summaries
- Dockerize the application


//frontend\src\api.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://private-notes-ai.onrender.com",
  timeout: 15000,
});
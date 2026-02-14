//backend\src\services\ai.service.js
import fetch from "node-fetch";

const HF_API_KEY = process.env.HF_API_KEY;

export const summarizeWithAI = async (text) => {
  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            max_length: 120,
            min_length: 30,
          },
        }),
      }
    );

    const data = await response.json();
    console.log("HF RAW:", data);

    if (Array.isArray(data) && data[0]?.summary_text) {
      const paragraph = data[0].summary_text;

      const bullets = paragraph
        .split(/(?<=[.!?])\s+/)
        .slice(0, 5)
        .map(s => `• ${s.trim()}`)
        .join("\n");

      return bullets;
    }

    if (data?.error && data?.estimated_time) {
      await new Promise((r) => setTimeout(r, 2000));
      return summarizeWithAI(text);
    }

    throw new Error("HF returned no summary");
  } catch (err) {
    console.error("HF error:", err);
    throw err;
  }
};
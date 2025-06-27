import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function callClaude(messages, resumeText, jobDescText) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "anthropic/claude-3-haiku",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: `You're an AI resume assistant helping users improve their resume, job fit, and career path based on their resume and a job description. Be helpful, practical, honest, and easy to understand.`,
          },
          {
            role: "user",
            content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescText}`,
          },
          ...messages
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    const rawMessage = response.data?.choices?.[0]?.message;
    if (!rawMessage || !rawMessage.content) {
      throw new Error("Claude returned an empty message");
    }

    return rawMessage;
  } catch (error) {
    console.error("❌ Claude Chat API error:", error.response?.data || error.message);
    throw new Error("Failed to get Claude chat response");
  }
}

import axios from 'axios';

export async function callClaude(messages, resumeText, jobDescText) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: `You are a professional AI assistant helping the user with resume improvement and job-fit guidance based on their resume and job description.\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescText}`,
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

    return response.data.choices[0].message;
  } catch (error) {
    console.error("Claude API error:", error.response?.data || error.message);
    throw error;
  }
}

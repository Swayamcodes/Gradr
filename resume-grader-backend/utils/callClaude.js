import axios from 'axios';

export async function callClaude(prompt) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "anthropic/claude-3-haiku",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Claude API error:", error.response?.data || error.message);
    throw error;
  }
}

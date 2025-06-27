import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function callClaude(messages, resumeText, jobDescText) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: `You are an expert resume optimization specialist and career coach with a deep understanding of ATS systems, recruitment, and job-market trends.

You are assisting a user by analyzing how well their resume matches a target job description.

📄 Resume Content:
"""
${resumeText}
"""

📝 Job Description:
"""
${jobDescText}
"""

🎯 Your task:
- Score the resume from 0–100 based on job fit
- Identify keyword matches and gaps (skills, tools, tech, terms)
- Comment on how relevant the candidate’s experience is
- Provide ATS-friendly formatting & language tips
- Suggest high-impact improvements (title, formatting, grammar, etc.)

⚠️ Return ONLY valid JSON (no markdown, no text, no explanation). Format like this:

{
  "matchScore": number (0–100),
  "keywordMatch": {
    "matched": [string],
    "missing": [string]
  },
  "experienceRelevance": string (brief summary),
  "atsSuggestions": [
    { "tip": string, "status": "pass" | "fail" }
  ],
  "resumeTips": [
    {
      "title": string,
      "description": string,
      "impact": "high" | "medium" | "low",
      "category": "content" | "formatting" | "grammar" | "style" | "keywords"
    }
  ]
}

If you cannot produce this JSON, reply with the string: ERROR.`
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

    let raw = response.data.choices[0].message.content.trim();

   
    raw = raw.replace(/^```json|^```|```$/g, '').trim();

    if (raw === "ERROR") throw new Error("Claude returned 'ERROR'");

    const parsed = JSON.parse(raw);

    
    if (
      !parsed.keywordMatch ||
      !Array.isArray(parsed.keywordMatch.matched) ||
      !Array.isArray(parsed.keywordMatch.missing)
    ) {
      parsed.keywordMatch = { matched: [], missing: [] };
    }

    return parsed;

  } catch (error) {
    console.error("💥 Claude API error:", error.response?.data || error.message);
    throw new Error('Invalid Claude response format');
  }
}

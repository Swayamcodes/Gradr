import axios from 'axios';

export const callClaude = async (resumeText, jobDescText) => {
  const prompt = `
You are an advanced AI resume analyst. Given the following resume and job description, evaluate how well the resume fits the role. Return the following structure as valid JSON only — no explanation, no markdown, no extra characters, no quotes around the object:

{
  "matchScore": number (0–100),
  "keywordMatch": {
    "matched": [string],
    "missing": [string]
  },
  "experienceRelevance": string (summary),
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

Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescText}
"""
`;

  const headers = {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'AI Resume Grader',
  };

  const body = {
    model: 'anthropic/claude-3-haiku',
    messages: [{ role: 'user', content: prompt }],
  };

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', body, {
      headers,
    });

    let data = response.data.choices[0].message.content;


    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    // Failsafe: check for malformed keywordMatch
    if (
      !data.keywordMatch ||
      !Array.isArray(data.keywordMatch.matched) ||
      !Array.isArray(data.keywordMatch.missing)
    ) {
      console.warn("⚠️ Claude returned malformed keywordMatch. Using empty fallback.");
      data.keywordMatch = { matched: [], missing: [] };
    }

    return data;

  } catch (err) {
    console.error("💥 Error in callClaude:", err);
    throw new Error('Invalid Claude response format');
  }
};


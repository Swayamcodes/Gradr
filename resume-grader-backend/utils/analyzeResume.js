import axios from 'axios';

export const callClaude = async (resumeText, jobDescText) => {
  const prompt = `You are an ATS and resume optimization expert with 10+ years of experience.

🧠 Analyze the resume against the job description to evaluate:
- Technical skills, experience level, education, and cultural fit
- Hard & soft skills, project complexity, and industry relevance
- ATS-readiness and keyword optimization

📊 Scoring Criteria:
- 90–100: Excellent fit
- 80–89: Strong fit
- 70–79: Good fit
- 60–69: Moderate fit
- Below 60: Poor fit

🔍 Keyword Matching:
- Extract technical terms, tools, languages, frameworks, certifications
- Include industry terms and synonyms (e.g., "AI" vs "Artificial Intelligence")
- Prioritize recurring and “required” section keywords

Return ONLY valid JSON with this exact structure - no explanations, markdown, or additional text:

{
  "matchScore": number (0–100),
  "keywordMatch": {
    "matched": [string],
    "missing": [string]
  },
  "experienceRelevance": string,
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
"""`;

  const headers = {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://gradrapp.netlify.app',
    'X-Title': 'AI Resume Grader',
  };

  const body = {
    model: 'meta-llama/llama-3.1-70b-instruct',
    messages: [{ role: 'user', content: prompt }],
  };

  try {
    
    console.log("📤 Sending to Claude:", resumeText.length, jobDescText.length);

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      body,
      { headers }
    );

    let raw = response.data.choices?.[0]?.message?.content?.trim() || "";

    console.log("📥 Claude Raw Response:", raw.slice(0, 500));

    raw = raw.replace(/^```json|^```|```$/g, "").trim();

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Claude did not return valid JSON");

    const parsed = JSON.parse(jsonMatch[0]);

   
    if (
      !parsed.keywordMatch ||
      !Array.isArray(parsed.keywordMatch.matched) ||
      !Array.isArray(parsed.keywordMatch.missing)
    ) {
      parsed.keywordMatch = { matched: [], missing: [] };
    }

    return parsed;
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;
    console.error("💥 Error in callClaude (analyzeResume.js):", status, data || error.message);

    if (status === 402) {
      throw new Error("OpenRouter billing error – not enough tokens or account unpaid.");
    }

    throw new Error("Invalid Claude response format");
  }
};

import axios from 'axios';

export const callClaude = async (resumeText, jobDescText) => {
  const prompt = `You are an expert ATS (Applicant Tracking System) and resume optimization specialist with 10+ years of experience...
ANALYSIS REQUIREMENTS:
- Evaluate technical skills, experience level, education, and cultural fit
- Consider both hard skills (technical abilities) and soft skills (leadership, communication)
- Assess years of experience, project complexity, and industry relevance
- Account for ATS parsing challenges and keyword optimization
- Provide actionable, specific feedback rather than generic advice

SCORING METHODOLOGY:
- 90-100: Exceptional fit, meets all requirements plus additional qualifications
- 80-89: Strong fit, meets most key requirements with minor gaps
- 70-79: Good fit, meets core requirements but has some skill gaps
- 60-69: Moderate fit, meets basic requirements but significant gaps exist
- Below 60: Poor fit, major requirements missing

KEYWORD ANALYSIS INSTRUCTIONS:
- Extract exact technical terms, tools, programming languages, frameworks, certifications
- Include industry-specific terminology and methodologies
- Consider variations and synonyms (e.g., "JavaScript" vs "JS", "AI" vs "Artificial Intelligence")
- Prioritize keywords that appear multiple times in job description
- Focus on skills mentioned in "required" vs "preferred" sections

Return ONLY valid JSON with this exact structure - no explanations, markdown, or additional text:

{
  "matchScore": number (0–100),
  "keywordMatch": {
    "matched": [string],
    "missing": [string]
  },
  "experienceRelevance": string (2-3 sentence summary),
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

Resume Content:
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
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'AI Resume Grader',
  };

  const body = {
    model: 'anthropic/claude-3-haiku',
    messages: [{ role: 'user', content: prompt }],
  };

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      body,
      { headers }
    );

    let content = response.data.choices[0].message.content;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Claude did not return valid JSON.");

    let data;
    try {
      data = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("❌ JSON parsing failed:", err.message);
      throw new Error("Claude returned malformed JSON.");
    }

    
    if (
      !data.keywordMatch ||
      !Array.isArray(data.keywordMatch.matched) ||
      !Array.isArray(data.keywordMatch.missing)
    ) {
      console.warn("⚠️ Claude returned malformed keywordMatch. Using fallback.");
      data.keywordMatch = { matched: [], missing: [] };
    }

    return data;
  } catch (err) {
    console.error("💥 Error in callClaude:", err);
    throw new Error('Invalid Claude response format');
  }
};

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
    model: 'anthropic/claude-3-haiku',
    messages: [{ role: 'user', content: prompt }],
  };

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', body, { headers });

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
    console.error("💥 Error in callClaude:", error.message || error);
    throw new Error("Invalid Claude response format");
  }
};

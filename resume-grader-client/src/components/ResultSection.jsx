import React from "react";
import FitScoreCard from "./FitScoreCard";
import SkillMatchSection from "./SkillMatchSection";
import ExperienceMatchSection from "./ExperienceMatchSection";
import ATSChecklist from "./ATSChecklist";
import SuggestionsSection from "./SuggestionsSection";
import ChatWidget from "./ChatWidget";

const ResultSection = ({ result }) => {
  if (!result) return null;

  const skillMatchPercent = Math.round(
    (result.keywordMatch?.matched.length /
      ((result.keywordMatch?.matched.length || 0) + (result.keywordMatch?.missing.length || 0))) * 100
  );

  const experienceLevel = result.experienceRelevance?.toLowerCase().includes("strong")
    ? "Strong Match"
    : result.experienceRelevance?.toLowerCase().includes("some")
    ? "Partial Match"
    : "Low Relevance";

  const atsLevel =
    result.atsSuggestions?.length < 2
      ? "High"
      : result.atsSuggestions?.length < 5
      ? "Medium"
      : "Low";

  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden pt-24 px-4 md:px-8" id="results">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30"></div>
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto py-12 space-y-16">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text mb-4">
              Optimization Report
            </h1>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Deep-dive resume match results crafted with AI precision.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 animate-slideInLeft">
            <div className="sharp-card text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {result.matchScore}%
              </div>
              <p className="text-sm text-slate-400 mt-2">Overall Match</p>
            </div>
            <div className="sharp-card text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                {skillMatchPercent}%
              </div>
              <p className="text-sm text-slate-400 mt-2">Skill Match</p>
            </div>
            <div className="sharp-card text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                {atsLevel}
              </div>
              <p className="text-sm text-slate-400 mt-2">ATS Score</p>
            </div>
          </div>

          {/* Detail Sections */}
          <div className="space-y-10 animate-fadeInUp">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="sharp-card">
                <FitScoreCard score={result.matchScore} skillMatch={skillMatchPercent} experienceLevel={experienceLevel} atsLevel={atsLevel} />
              </div>
              <div className="sharp-card">
                <SkillMatchSection skills={result.keywordMatch} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="sharp-card">
                <ExperienceMatchSection experience={result.experienceRelevance} />

              </div>
              <div className="sharp-card">
                <ATSChecklist tips={result.atsSuggestions} />
              </div>
            </div>

            <div className="sharp-card">
              <SuggestionsSection suggestions={result.resumeTips} />
            </div>

            <div className="sharp-card">
              <ChatWidget resumeText={result.resumeText} jobDescText={result.jobDescText} />
            </div>
          </div>
        </div>

       
      </section>
    </>
  );
};

export default ResultSection;

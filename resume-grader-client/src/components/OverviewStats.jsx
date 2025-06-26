// src/components/OverviewStats.jsx
import React from 'react';

const OverviewStats = ({ stats }) => {
  const {
    matchScore,
    skillMatch,
    experienceRelevance,
    keywordMatch,
    lengthRating,
    parseQuality,
  } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      
      <div className="glass-card flex flex-col items-center justify-center p-6">
        <div className="text-white text-sm mb-2">Overall Match Score</div>
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90" width="96" height="96">
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="#2a2a2a"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="#4ade80"
              strokeWidth="10"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * matchScore) / 100}
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-green-400">
            {matchScore}%
          </div>
        </div>
      </div>

      <StatBar label="Skill Match" value={skillMatch} />
      <StatBar label="Experience Relevance" value={experienceRelevance} />
      <StatBar label="Keyword Match" value={keywordMatch} />

      <Badge label="Resume Length" value={lengthRating} />
      <Badge label="File Quality" value={parseQuality} />
    </div>
  );
};

const StatBar = ({ label, value }) => (
  <div className="glass-card p-6">
    <div className="text-white text-sm mb-2">{label}</div>
    <div className="w-full bg-zinc-700 rounded-full h-3">
      <div
        className="h-3 rounded-full bg-green-400 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
    <div className="text-right text-xs text-white mt-1">{value}%</div>
  </div>
);

const Badge = ({ label, value }) => {
  const colorMap = {
    Optimal: 'bg-green-600',
    Short: 'bg-yellow-500',
    Long: 'bg-red-500',
    Good: 'bg-green-600',
    Bad: 'bg-red-600',
  };

  return (
    <div className="glass-card p-6 flex flex-col gap-2 justify-between">
      <div className="text-white text-sm">{label}</div>
      <span
        className={`w-fit px-3 py-1 rounded-full text-xs font-medium text-white ${colorMap[value]}`}
      >
        {value}
      </span>
    </div>
  );
};

export default OverviewStats;

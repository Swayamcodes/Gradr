import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

const FitScoreCard = ({ score, skillMatch, experienceLevel, atsLevel }) => {
  const atsColor =
    atsLevel === "High"
      ? "text-green-400"
      : atsLevel === "Medium"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div >

      <div className="flex justify-center items-center flex-col space-y-4">
        <div className="w-28 h-28">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#22c55e",
              trailColor: "#334155",
              textSize: "18px",
            })}
          />
        </div>
        <p className="text-lg font-semibold text-white tracking-wide">
          Overall Fit Score
        </p>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-600/20 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/10">
          <p className="text-sm text-slate-400 mb-1">Skill Match</p>
          <p className="text-base font-semibold text-emerald-400">
            {skillMatch}% keywords matched
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-600/20 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-purple-500/10">
          <p className="text-sm text-slate-400 mb-1">Experience Relevance</p>
          <p className="text-base font-semibold text-purple-300">
            {experienceLevel}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-600/20 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10 sm:col-span-2">
          <p className="text-sm text-slate-400 mb-1">ATS Compatibility</p>
          <p className={`text-base font-semibold ${atsColor}`}>
            {atsLevel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FitScoreCard;

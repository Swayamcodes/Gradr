import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ATSChecklist = ({ tips = [] }) => {
  if (!tips.length) return null;

  return (
    <div >
      <h3 className="text-white text-xl font-semibold mb-6">⚙️ ATS Optimization</h3>

      <ul className="space-y-4">
        {tips.map((item, idx) => {
          const passed = item.status === "pass";

          return (
            <li
              key={idx}
              className={`flex items-start gap-3 rounded-lg p-4 border transition-all duration-200 ${
                passed
                  ? "bg-green-500/10 border-green-400/30 hover:bg-green-500/20"
                  : "bg-red-500/10 border-red-400/30 hover:bg-red-500/20"
              }`}
            >
              {passed ? (
                <FaCheckCircle className="text-green-400 mt-1" />
              ) : (
                <FaTimesCircle className="text-red-400 mt-1" />
              )}
              <span className="text-gray-300 text-sm leading-relaxed">{item.tip}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ATSChecklist;

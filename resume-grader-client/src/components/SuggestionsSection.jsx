import React from "react";
import { Badge } from "./ui/badge";
import { Sparkles, Wrench, Brush, CheckCircle, AlertTriangle } from "lucide-react";

const impactColors = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-400 text-black",
  low: "bg-green-500 text-white",
};

const categoryIcons = {
  content: <Sparkles className="h-4 w-4 mr-1" />,
  formatting: <Wrench className="h-4 w-4 mr-1" />,
  grammar: <CheckCircle className="h-4 w-4 mr-1" />,
  style: <Brush className="h-4 w-4 mr-1" />,
  keywords: <AlertTriangle className="h-4 w-4 mr-1" />,
};

const SuggestionsSection = ({ suggestions = [] }) => {
  if (!suggestions.length) return null;

  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-white">
        Resume Improvement Suggestions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((tip, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-800/30 via-slate-700/20 to-slate-800/30 backdrop-blur-xl border border-slate-600/20 rounded-2xl p-5 transition-all duration-300 hover:border-slate-400/40 hover:scale-[1.015] hover:shadow-lg relative overflow-hidden text-white space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{tip.title}</h4>
              <Badge className={`capitalize ${impactColors[tip.impact]}`}>
                {tip.impact} impact
              </Badge>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {tip.description}
            </p>

            <div className="mt-2 flex items-center text-sm text-gray-200">
              <Badge
                variant="secondary"
                className="bg-white/10 text-gray-200 flex items-center gap-1 px-2 py-1"
              >
                {categoryIcons[tip.category]} {tip.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestionsSection;

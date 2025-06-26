import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const SkillMatchChart = ({ matched = [], missing = [] }) => {
  const matchedData = matched.map((skill) => ({
    name: skill,
    value: 1,
    type: "Matched",
  }));

  const missingData = missing.map((skill) => ({
    name: skill,
    value: 1,
    type: "Missing",
  }));

  const chartData = [...matchedData, ...missingData];

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-4">
        Skill Match Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 35)}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          barSize={20}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#cbd5e1", fontSize: 13 }}
            width={120}
          />
          <Tooltip
            formatter={() => ["Skill"]}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              color: "#fff",
              borderRadius: "0.5rem",
              padding: "0.5rem",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#fff", fontSize: 14 }}
          />
          <Bar
            dataKey="value"
            isAnimationActive={true}
            radius={[0, 8, 8, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.type === "Matched" ? "#22c55e" : "#ef4444"}
                className="hover:brightness-125 transition-all duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillMatchChart;

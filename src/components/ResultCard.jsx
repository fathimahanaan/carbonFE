import React from "react";

export default function ResultCard({ title, theme, rows, emission }) {
  return (
    <div className={`p-4 rounded-sm border ${theme.bg} ${theme.border}`}>
      <h3 className={`font-semibold ${theme.title}`}>{title}</h3>

      {rows.map((row, index) => (
        <p key={index} className="text-sm text-gray-600 pt-2">
          {row.label}: <span className="font-bold">{row.value}</span>
        </p>
      ))}

      {emission !== undefined && (
        <p className="text-sm pt-2">
          Emission:{" "}
          <span className={`font-bold ${theme.emission}`}>
            {emission.toFixed(2)} kg CO₂e
          </span>
        </p>
      )}
    </div>
  );
}

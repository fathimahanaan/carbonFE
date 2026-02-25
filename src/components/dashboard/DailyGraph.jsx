import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useDailyEmissionGraph from "../../hooks/insights/useDailyEmissionGraph";
import LoadingSpinner from "../LoadingSpinner";
 

 
const COLORS = [   "#8aa2d8",  
  "#9be093", 
  "#e1bb7b9d",   ];

export default function DailyGraph() {
  const { emissions, loading } = useDailyEmissionGraph();

  if (loading) return <p className="text-center"><LoadingSpinner/></p>;
  if (!emissions.length) return <p className="text-center">No emissions data available.</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 className="text-center font-semibold mb-2">Today's Emissions Breakdown (kg CO₂e)</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={emissions}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {emissions.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

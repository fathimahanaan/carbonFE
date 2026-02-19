import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import useDailyPrediction from "../../hooks/predictions/useDailyPrediction";

export default function PredictionLineChart() {
  const { predicted, loading } = useDailyPrediction();

  if (loading) return <p>Loading predictions...</p>;
  if (!predicted.length) return <p>No prediction data</p>;

  const tomorrow = predicted[0];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      {/* 🌟 Tomorrow Highlight Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6  flex flex-col space-y-4"
      >
        <h3 className="text-2xl font-semibold text-center">
          Tomorrow's prediction ({tomorrow.date})
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {["vehicle", "food", "energy", "total"].map((key) => (
            <div
              key={key}
              className="flex flex-col items-center p-4 bg-white/20   backdrop-blur-sm animate-pulse"
            >
              <span className="font-bold text-xl text-blue-200">
                {tomorrow[key].toFixed(2)}
              </span>
              <span className="text-sm capitalize text-blue-100">{key}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white    p-4"
      >
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={predicted}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${value.toFixed(2)} kg CO₂e`, name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend verticalAlign="bottom" height={36} />
            <Line
              type="monotone"
              dataKey="vehicle"
              stroke="#ebca5e"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="food"
              stroke="#92bdf2"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#a9f6b1"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#276abb"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

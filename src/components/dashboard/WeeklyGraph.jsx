import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useGetWeeklyGraph from "../../hooks/insights/useGetWeeklyGraph";
import LoadingSpinner from "../LoadingSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * WeeklyGraph.jsx
 *
 * Bar chart displaying CO₂ emissions over the last 7 days.
 *
 * Original code generated with the help of OpenAI's ChatGPT (March 2026).
 *
 * Libraries used:
 *   - React: https://reactjs.org/
 *   - Chart.js: https://www.chartjs.org/
 *
 * Custom modifications :
 *   - Weekly 7-day date handling
 *   - Custom emission thresholds (LOW/HIGH) and corresponding colors
 *     (e.g., high emissions >50 kg highlighted in red, neutral in blue, low in green)
 *   - Background styling, borders, and shadow effects
 *   - Tooltip formatting with emission levels
 *   - Overall restructuring and styling adjustments
 *
 * ChatGPT reference: https://chat.openai.com/
 */
const EMISSION_THRESHOLDS = { LOW: 50, HIGH: 150 };

const getColorByEmission = (value) => {
  if (value > EMISSION_THRESHOLDS.HIGH) return "rgba(233, 32, 5, 0.8)";
  if (value >= EMISSION_THRESHOLDS.LOW) return "rgba(51, 168, 246, 0.8)";
  return "rgba(78, 221, 78, 0.8)";
};

export default function WeeklyGraph() {
  const { weeklyEmissions, loading } = useGetWeeklyGraph();

  if (loading)
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  if (!weeklyEmissions.length) return <p>No emission data found</p>;
  <p className="text-green-900"> Insights</p>;

  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "2-digit",
      day: "2-digit",
    });
  });

  const emissionsMap = Object.fromEntries(
    weeklyEmissions.map((d) => [d.date, d.emission]),
  );

  const values = last7Days.map((date) => emissionsMap[date] ?? 0);
  const labels = last7Days;
  const barColors = values.map((v) => getColorByEmission(v));

  const data = {
    labels,
    datasets: [
      {
        label: "CO₂ Emissions (kg)",
        data: values,
        backgroundColor: barColors, 
        borderColor: barColors.map((c) => c.replace("0.8", "1")),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Weekly CO₂ Emissions" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.raw;
            const level =
              value > EMISSION_THRESHOLDS.HIGH
                ? "High"
                : value >= EMISSION_THRESHOLDS.LOW
                  ? "Neutral"
                  : "Low";
return `${value.toFixed(2)} kg CO₂ – ${level}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Emissions (kg)" },
      },
      x: { title: { display: true, text: "Day of Week" } },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "550px",
        height: "350px",
        margin: "2rem auto",
        padding: "1rem",
        background: "#fafdff",
        border: "2px solid #9aacee",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

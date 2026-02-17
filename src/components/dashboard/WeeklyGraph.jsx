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
 
 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Emission thresholds for coloring
const EMISSION_THRESHOLDS = { LOW: 50, HIGH: 150 };

const getColorByEmission = (value) => {
  if (value > EMISSION_THRESHOLDS.HIGH) return "rgba(153, 30, 14, 0.8)"; // High
  if (value >= EMISSION_THRESHOLDS.LOW) return "rgba(51, 168, 246, 0.8)"; // Neutral
  return "rgba(35, 118, 35, 0.8)";  
};

export default function  WeeklyGraph() {
  const { weeklyEmissions, loading } = useGetWeeklyGraph();
 
  if (loading) return <p><LoadingSpinner/></p>;
  if (!weeklyEmissions.length) return <p>No emission data yet</p>;
<p className="text-green-900"> Insights</p>
  // Fill missing days with 0
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
    weeklyEmissions.map((d) => [d.date, d.emission])
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
        borderWidth: 12,
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
            return `${value} kg CO₂ – ${level}`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Emissions (kg)" } },
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
        background: "#c0e7f7",
         
 
        
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

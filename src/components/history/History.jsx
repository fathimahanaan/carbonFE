import React from "react";
import useGetHistory from "../../hooks/history/useGetHistory";
 
 

export default function History() {
  const { history, loading } = useGetHistory();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">History</h1>

        {/* 1) THIS IS THE KEY: MAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((r) => (
            <div
              key={r._id}
              className="p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/40 shadow-xl"
            >
              <div className="flex justify-between mb-4">
                <div className="font-semibold text-gray-800">
                  {new Date(r.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  Total: <b>{r.totalEmission.toFixed(2)} kg</b>
                </div>
              </div>

              <CardRow title="Vehicle" value={`${r.vehicle.data.activity} • ${r.vehicle.data.type} • ${r.vehicle.data.fuel} • ${r.vehicle.data.distance} ${r.vehicle.data.unit}`} badge={r.vehicle.totalEmission} />
              <CardRow title="Food" value={r.food.length ? r.food.map(f => `${f.data.product} (${f.data.amount}${f.data.unit})`).join(", ") : "No food entries"} badge={r.food.length} />
              <CardRow title="Energy" value={`${r.energy.data.activity} • ${r.energy.data.amount} ${r.energy.data.unit}`} badge={r.energy.totalEmission} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CardRow = ({ title, value, badge }) => (
  <div className="mb-4 p-4 rounded-2xl bg-white/60 border border-white/40">
    <div className="flex justify-between items-center">
      <div className="font-bold text-gray-800">{title}</div>
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/30">
        {badge}
      </span>
    </div>
    <div className="text-sm text-gray-700 mt-2">{value}</div>
  </div>
);
//hello
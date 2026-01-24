import React from "react";
import useGetHistory from "../../hooks/history/useGetHistory";
import { useDeleteHistory } from "../../hooks/history/useDeleteHistory";

export default function History() {
  const { loading, history, refetch } = useGetHistory();
  const { deleteHistory, loading: deleteLoading } = useDeleteHistory();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">History</h1>

      {history.map((r) => (
        <div key={r._id} className="bg-white p-4 mb-4 rounded-lg shadow">
          
          {/* Delete Button */}
          <button
            onClick={async () => {
              const confirm = window.confirm("Are you sure you want to delete this record?");
              if (!confirm) return;

              await deleteHistory(r._id);
              refetch(); // <-- REFRESH LIST AFTER DELETE
            }}
            disabled={deleteLoading}
            className="px-4 py-1 mb-2 rounded bg-red-100 text-red-700 text-sm"
          >
            Delete
          </button>

          {/* Date */}
          <p className="text-sm text-gray-500">
            {new Date(r.date).toLocaleDateString()}
          </p>

          {/* Total */}
          <p className="font-semibold mt-1">
            Total Emission: {r.totalEmission.toFixed(2)} kg
          </p>

          {/* Vehicle */}
          <Section
            title="Vehicle"
            emission={r.vehicle.totalEmission}
            details={`${r.vehicle.data.activity}, ${r.vehicle.data.type}, ${r.vehicle.data.fuel}, ${r.vehicle.data.distance} ${r.vehicle.data.unit}`}
            color="bg-blue-100 text-blue-800"
          />

          {/* Food */}
          <Section
            title="Food"
            emission={r.food.reduce((sum, f) => sum + f.totalEmission, 0)}
            details={
              r.food.length
                ? r.food
                    .map((f) => `${f.data.product} (${f.data.amount}${f.data.unit})`)
                    .join(", ")
                : "No food entries"
            }
            color="bg-green-100 text-green-800"
          />

          {/* Energy */}
          <Section
            title="Energy"
            emission={r.energy.totalEmission}
            details={`${r.energy.data.activity}, ${r.energy.data.amount} ${r.energy.data.unit}`}
            color="bg-yellow-100 text-yellow-800"
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- Reusable Section Component ---------- */
function Section({ title, emission, details, color }) {
  return (
    <div className={`mt-3 p-3 rounded-md ${color}`}>
      <p className="font-medium">
        {title} – {emission.toFixed(2)} kg
      </p>
      <p className="text-sm">{details}</p>
    </div>
  );
}

import React from "react";
import useGetHistory from "../../hooks/history/useGetHistory";
import { useDeleteHistory } from "../../hooks/history/useDeleteHistory";
import { MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from "../LoadingSpinner";

export default function History() {
  const { loading, history: historyRecords, refetch } = useGetHistory();
  const { deleteHistory, loading: deleting } = useDeleteHistory();

  // Show loading state while fetching history
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        <LoadingSpinner />
      </p>
    );
  }

  // Handle deleting a record
  const handleDelete = async (recordId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmed) return;

    await deleteHistory(recordId);
    refetch(); // refresh after deletion
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Page header */}
      <h1 className="text-2xl text-green-700 font-bold mb-1">
        Emission History
      </h1>
      <p className="text-sm text-gray-600 font-medium mb-4">
        Review, analyze, or remove your previously calculated emission records.
      </p>

      {historyRecords.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No history records found.
        </p>
      ) : (
        historyRecords
          .filter((record) => record != null) // remove null records
          .map((record) => (
            <div
              key={record._id}
              className="bg-white p-4 mb-5 rounded-lg shadow-sm"
            >
              {/* Delete button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(record._id)}
                  disabled={deleting}
                  className="p-1 rounded text-red-700 hover:text-red-500 transition"
                  title="Delete record"
                >
                  <MdDeleteOutline size={20} />
                </button>
              </div>

              {/* Record Date */}
              <p className="text-sm text-gray-500 mb-1">
                Date: {record.date ? new Date(record.date).toLocaleDateString() : "Unknown"}
              </p>

              {/* Total Emission */}
              <p className="font-semibold mb-3">
                Total Emission: {(record.totalEmission ?? 0).toFixed(2)} kg CO₂e
              </p>

              {/* Vehicle Section */}
              <HistorySection
                title="Vehicle"
                emission={record.vehicle?.totalEmission ?? 0}
                details={
                  record.vehicle?.data
                    ? `${record.vehicle.data.activity}, ${record.vehicle.data.type}, ${record.vehicle.data.fuel}, ${record.vehicle.data.distance} ${record.vehicle.data.unit}`
                    : "No vehicle data"
                }
                color="bg-yellow-200/50"
              />

              {/* Food Section */}
              <HistorySection
                title="Food"
                emission={
                  record.food?.reduce(
                    (sum, f) => sum + (f?.totalEmission ?? 0),
                    0
                  ) ?? 0
                }
                details={
                  record.food?.length > 0
                    ? record.food
                        .map((item) =>
                          item?.data
                            ? `${item.data.product} (${item.data.amount} ${item.data.unit})`
                            : "Unknown food"
                        )
                        .join(", ")
                    : "No food entries"
                }
                color="bg-green-300"
              />

              {/* Energy Section */}
              <HistorySection
                title="Energy"
                emission={record.energy?.totalEmission ?? 0}
                details={
                  record.energy?.data
                    ? `${record.energy.data.activity}, ${record.energy.data.amount} ${record.energy.data.unit}`
                    : "No energy data"
                }
                color="bg-green-200"
              />
            </div>
          ))
      )}
    </div>
  );
}

// ----------------------
// HistorySection component
// ----------------------
function HistorySection({ title, emission, details, color }) {
  return (
    <div className={`mt-3 p-3 rounded-md ${color}`}>
      <p className="font-medium mb-1">
        {title} – {(emission ?? 0).toFixed(2)} kg CO₂e
      </p>
      <p className="text-sm text-gray-700">{details || "No data available"}</p>
    </div>
  );
}

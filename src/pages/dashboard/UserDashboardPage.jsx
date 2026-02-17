import React from "react";
import WeeklyGraph from "../../components/dashboard/WeeklyGraph";
import DailyGraph from "../../components/dashboard/DailyGraph";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import PredictionLineChart from "../../components/dashboard/PredictionLineChart";

export default function UserDashboardPage() {
  const { user } = useAuth();

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className=" min-h-screen">
      {/* Dashboard Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Dashboard</h1>
        <h2 className="text-lg text-blue-800">Welcome, {user.name}!</h2>
      </div>

      {/* Graph Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-100 to-green-200   shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Weekly Overview
          </h2>
          <WeeklyGraph />
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-200   shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Daily Activity
          </h2>
          <DailyGraph />
        </div>
      </div>

      {/* Prediction Line Chart */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-200  shadow p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
          Upcoming Emissions Prediction
        </h2>
        <PredictionLineChart />
      </div>
    </div>
  );
}

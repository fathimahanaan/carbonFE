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
    
     

      {/* Graph Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className=" ">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Weekly Overview
          </h2>
          <WeeklyGraph />
        </div>

        <div className="flex flex-col bg-white border border-amber-100  shadow-sm p-4">
          <DailyGraph />
        </div>
      </div>

      {/* Prediction Line Chart */}
      <div className="">
       
        <PredictionLineChart />
      </div>
    </div>
  );
}

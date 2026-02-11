import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className="w-16 h-16 border-1 border-t-green-600 border-b-green-300 border-l-green-200 border-r-green-400  rounded-full mb-4"
        style={{ animation: "spin 2s linear infinite" }}
      ></div>
      <p className="text-gray-700 text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

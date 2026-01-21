import React, { useState } from "react";
import { motion } from "framer-motion";
import FormSelect from "../../FormSelect";
import FormInput from "../../FormInput";
import useCalculateAllEmissions from "../../../hooks/history/useCalculateAllEmissions";
import useGetVehicleOptions from "../../../hooks/vehicle/useGetVehicleOptions";
import ResultRow from "../../ResultRow";
import AddEnergyForm from "./AddEnergyForm";
import AddFoodForm from "./AddFoodForm";
 
const CalculateEmissionsPage = () => {
  const { loading, result, calculateEmissions } = useCalculateAllEmissions();

  const [activeTab, setActiveTab] = useState("vehicle");

  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [fuel, setFuel] = useState("");
  const [unit, setUnit] = useState("");
  const [distance, setDistance] = useState("");

  const [energyActivity, setEnergyActivity] = useState("");
  const [energyUnit, setEnergyUnit] = useState("");
  const [amount, setAmount] = useState("");

  const [foodProduct, setFoodProduct] = useState("");
  const [foodUnit, setFoodUnit] = useState("");
  const [foodAmount, setFoodAmount] = useState("");

  const { options, loading: loadingOptions } = useGetVehicleOptions(activity);

  const handleSubmit = async () => {
    if (!activity || !distance || !energyActivity || !amount || !foodProduct)
      return;

    await calculateEmissions({
      vehicleData: {
        activity,
        type,
        fuel,
        unit,
        distance: Number(distance),
      },
      energyData: {
        activity: energyActivity,
        unit: energyUnit,
        amount: Number(amount),
      },
      foodItems: [
        {
          product: foodProduct,
          unit: foodUnit,
          amount: Number(foodAmount),
        },
      ],
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calculate All Emissions</h1>

      <div className="flex mb-4 border-b border-white/20 bg-white/10 backdrop-blur-md rounded-sm overflow-hidden">
        <button
          onClick={() => setActiveTab("vehicle")}
          className={`w-1/3 py-3 font-semibold transition-all duration-300 ${
            activeTab === "vehicle"
              ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-inner"
              : "bg-white/10 text-green-900 hover:bg-white/20"
          }`}
        >
          Vehicle
        </button>

        <button
          onClick={() => setActiveTab("energy")}
          className={`w-1/3 py-3 font-semibold transition-all duration-300 ${
            activeTab === "energy"
              ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-inner"
              : "bg-white/10 text-green-900 hover:bg-white/20"
          }`}
        >
          Energy
        </button>

        <button
          onClick={() => setActiveTab("food")}
          className={`w-1/3 py-3 font-semibold transition-all duration-300 ${
            activeTab === "food"
              ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-inner"
              : "bg-white/10 text-green-900 hover:bg-white/20"
          }`}
        >
          Food
        </button>
      </div>

      {activeTab === "vehicle" && (
        <section className="mb-6 p-4 rounded">
          <h2 className="font-semibold mb-2">Vehicle</h2>

          <FormSelect
            title="Activity"
            value={activity}
            onChange={(e) => {
              setActivity(e.target.value);
              setType("");
              setFuel("");
              setUnit("");
            }}
            list={options.activities}
          />

          <FormSelect
            title="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            list={options.types}
          />

          <FormSelect
            title="Fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            list={options.fuels}
          />

          <FormSelect
            title="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            list={options.units}
          />

          <FormInput
            label="Distance"
            type="number"
            min="0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance"
          />
        </section>
      )}

      {activeTab === "energy" && (
        <AddEnergyForm
          energyActivity={energyActivity}
          setEnergyActivity={setEnergyActivity}
          energyUnit={energyUnit}
          setEnergyUnit={setEnergyUnit}
          amount={amount}
          setAmount={setAmount}
        />
      )}

      {activeTab === "food" && (
        <AddFoodForm
          foodProduct={foodProduct}
          setFoodProduct={setFoodProduct}
          foodUnit={foodUnit}
          setFoodUnit={setFoodUnit}
          foodAmount={foodAmount}
          setFoodAmount={setFoodAmount}
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || loadingOptions}
        className="px-6 py-3 bg-green-500 text-white rounded"
      >
        {loading ? "Calculating..." : "Calculate All Emissions"}
      </button>

      {result ? (
  <motion.div
    className="mt-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        🌿 Emission Result
      </h2>
      <span className="text-sm font-medium text-gray-500">
        {new Date().toLocaleString()}
      </span>
    </div>

    <div className="p-6 grid gap-4 md:grid-cols-2">
      {result.vehicle?.data && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <h3 className="font-semibold text-green-800">Vehicle</h3>
          <p className="text-sm text-gray-600 mt-1">
            Activity: <span className="font-medium">{result.vehicle.data.activity}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Emission:{" "}
            <span className="font-semibold text-green-900">
              {result.vehicle.totalEmission.toFixed(2)} kg CO₂e
            </span>
          </p>
        </div>
      )}

      {result.energy?.data && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <h3 className="font-semibold text-blue-800">Energy</h3>
          <p className="text-sm text-gray-700 mt-1">
            Activity: <span className="font-bold">{result.energy.data.activity}</span>
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Emission:{" "}
            <span className="font-semibold text-blue-900">
              {result.energy.totalEmission.toFixed(2)} kg CO₂e
            </span>
          </p>
        </div>
      )}

      {result.food?.length > 0 && (
        <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <h3 className="font-semibold text-yellow-800">Food</h3>
          <p className="text-sm text-gray-600 mt-1">
          Product: <span className= "font-bold">{result.food[0].data.product}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Emission:{" "}
            <span className="font-semibold text-yellow-900">
              {result.food[0].totalEmission.toFixed(2)} kg CO₂e
            </span>
          </p>
        </div>
      )}

      <div className="p-4 rounded-xl bg-blue-600 text-white border border-white/10 md:col-span-2">
        <h3 className="font-semibold">Total Emission</h3>
        <p className="text-2xl font-bold mt-1">
          {result.totalEmission.toFixed(2)} <span className="text-sm font-medium">kg CO₂e</span>
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Keep tracking your impact 🌍
        </p>
      </div>
    </div>
  </motion.div>
) : null}

    </div>
  );
};

export default CalculateEmissionsPage;

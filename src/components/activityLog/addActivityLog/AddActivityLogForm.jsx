import { useState } from "react";

import FormSelect from "../../FormSelect";
import FormInput from "../../FormInput";
import useCalculateAllEmissions from "../../../hooks/history/useCalculateAllEmissions";
import useGetVehicleOptions from "../../../hooks/vehicle/useGetVehicleOptions";
import AddEnergyForm from "./AddEnergyForm";
import AddFoodForm from "./AddFoodForm";
import ResultCard from "../../ResultCard";

const CalculateEmissionsPage = () => {
  const { loading, result, calculateEmissions } = useCalculateAllEmissions();
  const [activeTab, setActiveTab] = useState("vehicle");

  // Vehicle
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [fuel, setFuel] = useState("");
  const [unit, setUnit] = useState("");
  const [distance, setDistance] = useState("");

  // Energy
  const [energyActivity, setEnergyActivity] = useState("");
  const [energyUnit, setEnergyUnit] = useState("");
  const [amount, setAmount] = useState("");

  // Food
  const [foodProduct, setFoodProduct] = useState("");
  const [foodUnit, setFoodUnit] = useState("");
  const [foodAmount, setFoodAmount] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const { options, loading: loadingOptions } = useGetVehicleOptions(activity);
  const handleAddFoodItem = () => {
    if (!foodProduct || !foodUnit || !foodAmount) return;

    setFoodItems((prev) => [
      ...prev,
      {
        product: foodProduct,
        unit: foodUnit,
        amount: Number(foodAmount),
      },
    ]);

    setFoodProduct("");
    setFoodUnit("");
    setFoodAmount("");
  };

  const handleSubmit = async () => {
    if (
      !activity ||
      !distance ||
      !energyActivity ||
      !amount ||
      foodItems.length === 0
    )
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
      foodItems,
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-900 mb-2">
        Calculate your emission
      </h1>
      <p className="text-sm font-semibold text-gray-500 mb-6">
        Get a complete breakdown of your environmental impact
      </p>

      {/* Tabs */}
      <div className="flex mb-4 bg-white/10 rounded overflow-hidden">
        {["vehicle", "energy", "food"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/3 py-3 font-semibold transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white"
                : "text-green-900"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Vehicle */}
      {activeTab === "vehicle" && (
        <section className="mb-6 p-4">
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
          />
        </section>
      )}

      {/* Energy */}
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

      {/* Food */}
      {activeTab === "food" && (
        <AddFoodForm
          foodProduct={foodProduct}
          setFoodProduct={setFoodProduct}
          foodUnit={foodUnit}
          setFoodUnit={setFoodUnit}
          foodAmount={foodAmount}
          setFoodAmount={setFoodAmount}
          onAddFood={handleAddFoodItem}
          foodItems={foodItems}
        />
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || loadingOptions}
        className="px-6 py-3 bg-green-700 text-white rounded disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6  bg-white-100/70">
          <div className="px-6 py-5   flex justify-between">
            <h2 className="text-lg font-semibold text-green-600">
              🌿 Emission Result
            </h2>
            <span className="text-sm text-gray-500 font-semibold">
              {new Date().toLocaleString()}
            </span>
          </div>

          <div className="p-6 grid gap-4 md:grid-cols-2">
            {result.vehicle?.data && (
              <ResultCard
                title="Vehicle"
                theme={{
                  bg: "bg-gradient-to-r from-white to-green-400/30",
                  border: "border-green-200",
                  title: "text-green-800",
                  emission: "text-green-900",
                }}
                rows={[
                  { label: "Activity", value: result.vehicle.data.activity },
                  { label: "Type", value: result.vehicle.data.type },
                  { label: "Fuel", value: result.vehicle.data.fuel },
                  { label: "Unit", value: result.vehicle.data.unit },
                ]}
                emission={result.vehicle.totalEmission}
              />
            )}

            {result.energy?.data && (
              <ResultCard
                title="Energy"
                theme={{
                  bg: "bg-gradient-to-r from-white to-green-400/30",
                  border: "border-blue-100",
                  title: "text-blue-800",
                  emission: "text-blue-900",
                }}
                rows={[
                  { label: "Activity", value: result.energy.data.activity },
                  { label: "Unit", value: result.energy.data.unit },
                ]}
                emission={result.energy.totalEmission}
              />
            )}

            {Array.isArray(result.food) && result.food.length > 0 && (
              <ResultCard
                title="Food"
                theme={{
                  bg: "bg-gradient-to-r from-white to-green-400/30",
                  border: "border-yellow-100",
                  title: "text-yellow-800",
                  emission: "text-yellow-800",
                }}
                rows={result.food.map((item) => ({
                  label: item.data.product,
                  value: `${item.totalEmission.toFixed(2)} kg CO₂e`,
                }))}
              />
            )}

            <div className="p-4 rounded-sm bg-gradient-to-r from-white to-blue-400/30 text-white md:col-span-2">
              <h3 className="font-semibold text-purple-700">Total Emission</h3>
              <p className="text-2xl  text-purple-800 font-bold">
                {result.totalEmission.toFixed(2)} kg CO₂e
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculateEmissionsPage;

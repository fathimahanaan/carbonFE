import React, { useState } from "react";
import FormSelect from "../../FormSelect";
import FormInput from "../../FormInput";
import useCalculateAllEmissions from "../../../hooks/history/useCalculateAllEmissions";
import useGetVehicleOptions from "../../../hooks/vehicle/useGetVehicleOptions";
import ResultRow from "../../ResultRow";
import AddEnergyForm from "./AddEnergyForm";

const CalculateEmissionsPage = () => {
  const { loading, result, calculateEmissions } = useCalculateAllEmissions();

  // Tabs
  const [activeTab, setActiveTab] = useState("vehicle");

  // Vehicle states
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [fuel, setFuel] = useState("");
  const [unit, setUnit] = useState("");
  const [distance, setDistance] = useState("");

  // Energy states
  const [energyActivity, setEnergyActivity] = useState("");
  const [energyUnit, setEnergyUnit] = useState("");
  const [amount, setAmount] = useState("");

  const { options, loading: loadingOptions } = useGetVehicleOptions(activity);

  const handleSubmit = async () => {
    if (!activity || !distance || !energyActivity || !amount) return;

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
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calculate All Emissions</h1>

      {/* NAVBAR / TABS */}
{/* NAVBAR / TABS */}
<div className="flex mb-4 border-b border-white/20 bg-white/10 backdrop-blur-md rounded-sm overflow-hidden">
  <button
    onClick={() => setActiveTab("vehicle")}
    className={`w-1/2 py-3 font-semibold transition-all duration-300
      ${
        activeTab === "vehicle"
          ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-inner"
          : "bg-green-900/10 text-green-900 hover:bg-white/20"
      }`}
  >
    Vehicle
  </button>

  <button
    onClick={() => setActiveTab("energy")}
    className={`w-1/2 py-3 font-semibold transition-all duration-300
      ${
        activeTab === "energy"
          ? "bg-gradient-to-r from-[#2ecc71] to-[#006400] text-white shadow-inner"
          : "bg-white/10 text-green-900 hover:bg-white/20"
      }`}
  >
    Energy
  </button>
</div>
      

      {/* VEHICLE FORM */}
      {activeTab === "vehicle" && (
        <section className="mb-6 p-4   rounded">
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

      {/* ENERGY FORM */}
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

      {/* ONE button */}
      <button
        onClick={handleSubmit}
        disabled={loading || loadingOptions}
        className="px-6 py-3 bg-green-500 text-white rounded"
      >
        {loading ? "Calculating..." : "Calculate All Emissions"}
      </button>

      {/* RESULT */}
      {result ? (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h2 className="font-semibold mb-2">Result</h2>

          {result.vehicle?.data && (
            <>
              <ResultRow label="Vehicle Activity" value={result.vehicle.data.activity} />
              <ResultRow label="Vehicle Emission" value={`${result.vehicle.totalEmission.toFixed(2)} kg CO₂e`} />
              <hr className="my-2" />
            </>
          )}

          {result.energy?.data && (
            <>
              <ResultRow label="Energy Activity" value={result.energy.data.activity} />
              <ResultRow label="Energy Emission" value={`${result.energy.totalEmission.toFixed(2)} kg CO₂e`} />
              <hr className="my-2" />
            </>
          )}

          <ResultRow label="Total Emission" value={`${result.totalEmission.toFixed(2)} kg CO₂e`} />
        </div>
      ) : null}
    </div>
  );
};

export default CalculateEmissionsPage;

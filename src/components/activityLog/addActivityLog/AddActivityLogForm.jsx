import React, { useState } from "react";
import FormSelect from "../../FormSelect";
import FormInput from "../../FormInput";
import useCalculateAllEmissions from "../../../hooks/history/useCalculateAllEmissions";
import useGetVehicleOptions from "../../../hooks/vehicle/useGetVehicleOptions";

const CalculateEmissionsPage = () => {
  const { loading, result, calculateEmissions } = useCalculateAllEmissions();

  // pass activity to hook
  const [vehicleData, setVehicleData] = useState({
    activity: "",
    type: "",
    unit: "",
    fuel: "",
    distance: "",
  });

  const { options, loading: loadingOptions } = useGetVehicleOptions(vehicleData.activity);

  const handleSubmit = async () => {
    const payload = {};
    if (vehicleData.activity && vehicleData.distance) {
      payload.vehicleData = {
        ...vehicleData,
        distance: parseFloat(vehicleData.distance),
      };
    }
    await calculateEmissions(payload);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calculate All Emissions</h1>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Vehicle</h2>

        <FormSelect
          title="Activity"
          value={vehicleData.activity}
          onChange={(e) => {
            setVehicleData({
              ...vehicleData,
              activity: e.target.value,
              type: "",
              fuel: "",
              unit: "",
            });
          }}
          list={options.activities}
          multi={false}
          displayField={null}
        />

        <FormSelect
          title="Type"
          value={vehicleData.type}
          onChange={(e) => setVehicleData({ ...vehicleData, type: e.target.value })}
          list={options.types}
          multi={false}
          displayField={null}
        />

        <FormSelect
          title="Fuel"
          value={vehicleData.fuel}
          onChange={(e) => setVehicleData({ ...vehicleData, fuel: e.target.value })}
          list={options.fuels}
          multi={false}
          displayField={null}
        />

        <FormSelect
          title="Unit"
          value={vehicleData.unit}
          onChange={(e) => setVehicleData({ ...vehicleData, unit: e.target.value })}
          list={options.units}
          multi={false}
          displayField={null}
        />

        <FormInput
          label="Distance"
          type="number"
          value={vehicleData.distance}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, distance: e.target.value })
          }
          placeholder="Enter distance"
        />
      </section>

      <button
        onClick={handleSubmit}
        disabled={loading || loadingOptions}
        className="px-6 py-3 bg-green-500 text-white rounded"
      >
        {loading ? "Calculating..." : "Calculate Emissions"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="font-semibold">Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CalculateEmissionsPage;

import React, { useState } from "react";
import useCalculateAllEmissions from "../../../hooks/history/useCalculateAllEmissions";
 
 

const vehicleOptions = {
  activities: ["Cars (by market segment)"],
  types: ["Supermini", "Mini", "Upper medium", "Executive", "Luxury"],
  fuels: ["Petrol", "Diesel"],
  units: ["km", "miles"],
};

const CalculateEmissionsPage = () => {
  const { loading, result, calculateEmissions } = useCalculateAllEmissions();

  const [vehicleData, setVehicleData] = useState({
    activity: "",
    type: "",
    unit: "",
    fuel: "",
    distance: "",
  });

  const [foodItems, setFoodItems] = useState([]);
  const [foodInput, setFoodInput] = useState({
    product: "",
    unit: "kg",
    amount: "",
  });

  const [energyData, setEnergyData] = useState({
    activity: "",
    unit: "",
    amount: "",
  });

  const addFoodItem = () => {
    if (!foodInput.product || !foodInput.amount) return;
    setFoodItems([...foodItems, foodInput]);
    setFoodInput({ product: "", unit: "kg", amount: "" });
  };

  const handleSubmit = async () => {
    const payload = {};

    if (vehicleData.activity && vehicleData.distance) {
      payload.vehicleData = {
        ...vehicleData,
        distance: parseFloat(vehicleData.distance),
      };
    }

    if (foodItems.length > 0) {
      payload.foodItems = foodItems.map((item) => ({
        ...item,
        amount: parseFloat(item.amount),
      }));
    }

    if (energyData.activity && energyData.amount) {
      payload.energyData = {
        ...energyData,
        amount: parseFloat(energyData.amount),
      };
    }

    await calculateEmissions(payload);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calculate All Emissions</h1>

      {/* Vehicle */}
      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Vehicle</h2>

        <select
          value={vehicleData.activity}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, activity: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Activity</option>
          {vehicleOptions.activities.map((act) => (
            <option key={act} value={act}>
              {act}
            </option>
          ))}
        </select>

        <select
          value={vehicleData.type}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, type: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Type</option>
          {vehicleOptions.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={vehicleData.fuel}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, fuel: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Fuel</option>
          {vehicleOptions.fuels.map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>

        <select
          value={vehicleData.unit}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, unit: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Unit</option>
          {vehicleOptions.units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <input
          placeholder="Distance"
          type="number"
          value={vehicleData.distance}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, distance: e.target.value })
          }
          className="border p-2 w-full"
        />
      </section>

      {/* Food */}
      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Food</h2>
        <div className="grid grid-cols-3 gap-2">
          <input
            placeholder="Product"
            value={foodInput.product}
            onChange={(e) =>
              setFoodInput({ ...foodInput, product: e.target.value })
            }
            className="border p-2"
          />
          <select
            value={foodInput.unit}
            onChange={(e) =>
              setFoodInput({ ...foodInput, unit: e.target.value })
            }
            className="border p-2"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
          <input
            placeholder="Amount"
            type="number"
            value={foodInput.amount}
            onChange={(e) =>
              setFoodInput({ ...foodInput, amount: e.target.value })
            }
            className="border p-2"
          />
        </div>
        <button
          onClick={addFoodItem}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Food Item
        </button>
      </section>

      {/* Energy */}
      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Energy</h2>
        <input
          placeholder="Activity"
          value={energyData.activity}
          onChange={(e) =>
            setEnergyData({ ...energyData, activity: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <input
          placeholder="Unit"
          value={energyData.unit}
          onChange={(e) =>
            setEnergyData({ ...energyData, unit: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <input
          placeholder="Amount"
          type="number"
          value={energyData.amount}
          onChange={(e) =>
            setEnergyData({ ...energyData, amount: e.target.value })
          }
          className="border p-2 w-full"
        />
      </section>

      <button
        onClick={handleSubmit}
        disabled={loading}
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

import React, { useState } from "react";
import useCalculateAllEmissions from "../../../hooks/history/useCalculateAllEmissions";
 

const AddActivityLogForm = () => {
  const { loading, result, calculateEmissions } =
    useCalculateAllEmissions();

  // ---------------- Vehicle ----------------
  const [vehicleData, setVehicleData] = useState({
    activity: "",
    type: "",
    unit: "km",
    fuel: "",
    distance: "",
  });

  // ---------------- Food ----------------
  const [foodItems, setFoodItems] = useState([]);
  const [foodInput, setFoodInput] = useState({
    product: "",
    amount: "",
    unit: "g",
  });

  // ---------------- Energy ----------------
  const [energyData, setEnergyData] = useState({
    activity: "",
    unit: "",
    amount: "",
  });

  // ---------------- Handlers ----------------
  const addFoodItem = () => {
    if (!foodInput.product || !foodInput.amount) return;

    setFoodItems([...foodItems, foodInput]);
    setFoodInput({ product: "", amount: "", unit: "g" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await calculateEmissions({
      vehicleData: vehicleData.distance ? vehicleData : null,
      foodItems: foodItems.length ? foodItems : [],
      energyData: energyData.amount ? energyData : null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold">Add Activity Log</h2>

      {/* ---------------- Vehicle ---------------- */}
      <div>
        <h3 className="font-medium">Vehicle</h3>
        <input
          placeholder="Activity (e.g. Travel)"
          value={vehicleData.activity}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, activity: e.target.value })
          }
        />
        <input
          placeholder="Type (Car, Bike)"
          value={vehicleData.type}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, type: e.target.value })
          }
        />
        <input
          placeholder="Fuel (Petrol, Diesel)"
          value={vehicleData.fuel}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, fuel: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={vehicleData.distance}
          onChange={(e) =>
            setVehicleData({ ...vehicleData, distance: e.target.value })
          }
        />
      </div>

      {/* ---------------- Food ---------------- */}
      <div>
        <h3 className="font-medium">Food</h3>
        <input
          placeholder="Food name"
          value={foodInput.product}
          onChange={(e) =>
            setFoodInput({ ...foodInput, product: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={foodInput.amount}
          onChange={(e) =>
            setFoodInput({ ...foodInput, amount: e.target.value })
          }
        />
        <select
          value={foodInput.unit}
          onChange={(e) =>
            setFoodInput({ ...foodInput, unit: e.target.value })
          }
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
        </select>

        <button type="button" onClick={addFoodItem}>
          Add Food
        </button>

        {foodItems.map((f, i) => (
          <p key={i}>
            {f.product} - {f.amount}
            {f.unit}
          </p>
        ))}
      </div>

      {/* ---------------- Energy ---------------- */}
      <div>
        <h3 className="font-medium">Energy</h3>
        <input
          placeholder="Activity (Electricity)"
          value={energyData.activity}
          onChange={(e) =>
            setEnergyData({ ...energyData, activity: e.target.value })
          }
        />
        <input
          placeholder="Unit (kWh)"
          value={energyData.unit}
          onChange={(e) =>
            setEnergyData({ ...energyData, unit: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={energyData.amount}
          onChange={(e) =>
            setEnergyData({ ...energyData, amount: e.target.value })
          }
        />
      </div>

      {/* ---------------- Submit ---------------- */}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Activity"}
      </button>

      {/* ---------------- Result ---------------- */}
      {result && (
        <div className="mt-4">
          <h3>Total Emission</h3>
          <p>{result.totalEmission} kg CO₂e</p>
        </div>
      )}
    </form>
  );
};

export default AddActivityLogForm;


 



// import React, { useState } from "react";

// export const AddActivityLogForm = () => {
//   const sections = ["Food", "Transport", "Energy"];
//   const [activeSection, setActiveSection] = useState("Food");

//   // Food state
//   const [foodItems, setFoodItems] = useState([]);
//   const [foodProduct, setFoodProduct] = useState("");
//   const [foodAmount, setFoodAmount] = useState("");
//   const [foodUnit, setFoodUnit] = useState("kg");

//   // Transport state
//   const [transportData, setTransportData] = useState({ activity: "", distance: "", unit: "km" });

//   // Energy state
//   const [energyData, setEnergyData] = useState({ activity: "", amount: "", unit: "kWh" });

//   // Totals
//   const [foodTotal, setFoodTotal] = useState(0);
//   const [transportTotal, setTransportTotal] = useState(0);
//   const [energyTotal, setEnergyTotal] = useState(0);

//   // Emission factors (mock for demo)
//   const emissionFactors = { food: 5, transport: 0.2, energy: 0.5 };

//   // Add Food item
//   const addFoodItem = () => {
//     if (!foodProduct || !foodAmount) return;

//     let amountInKg = foodUnit === "g" ? foodAmount / 1000 : parseFloat(foodAmount);
//     const emission = amountInKg * emissionFactors.food;

//     const newItem = { product: foodProduct, amount: foodAmount, unit: foodUnit, totalEmission: emission };
//     const updatedItems = [...foodItems, newItem];
//     setFoodItems(updatedItems);
//     setFoodTotal(updatedItems.reduce((sum, i) => sum + i.totalEmission, 0));

//     // Reset form
//     setFoodProduct("");
//     setFoodAmount("");
//   };

//   // Update Transport and Energy totals
//   const updateTransportTotal = () => setTransportTotal((parseFloat(transportData.distance) || 0) * emissionFactors.transport);
//   const updateEnergyTotal = () => setEnergyTotal((parseFloat(energyData.amount) || 0) * emissionFactors.energy);

//   const overallTotal = foodTotal + transportTotal + energyTotal;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Activity Log</h1>

//       {/* Section Tabs */}
//       <div className="flex border-b mb-6">
//         {sections.map((sec) => (
//           <button
//             key={sec}
//             onClick={() => setActiveSection(sec)}
//             className={`px-6 py-3 -mb-px font-semibold border-b-2 ${
//               activeSection === sec
//                 ? "border-blue-500 text-blue-500"
//                 : "border-transparent text-gray-500 hover:text-gray-700"
//             } transition-colors`}
//           >
//             {sec}
//           </button>
//         ))}
//       </div>

//       {/* Section Panels */}
//       <div className="space-y-6">
//         {activeSection === "Food" && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Food Section</h2>
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="text"
//                 placeholder="Product"
//                 className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={foodProduct}
//                 onChange={(e) => setFoodProduct(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 className="w-24 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={foodAmount}
//                 onChange={(e) => setFoodAmount(e.target.value)}
//               />
//               <select
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={foodUnit}
//                 onChange={(e) => setFoodUnit(e.target.value)}
//               >
//                 <option value="kg">kg</option>
//                 <option value="g">g</option>
//               </select>
//               <button
//                 onClick={addFoodItem}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//               >
//                 Add
//               </button>
//             </div>

//             <ul className="mb-4 space-y-1">
//               {foodItems.map((item, idx) => (
//                 <li key={idx} className="text-gray-700">
//                   {item.product} - {item.amount} {item.unit} - {item.totalEmission.toFixed(2)} kg CO2e
//                 </li>
//               ))}
//             </ul>

//             <p className="font-medium text-gray-800">Total Food Emission: {foodTotal.toFixed(2)} kg CO2e</p>
//           </div>
//         )}

//         {activeSection === "Transport" && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Transport Section</h2>
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="text"
//                 placeholder="Activity"
//                 className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={transportData.activity}
//                 onChange={(e) => setTransportData({ ...transportData, activity: e.target.value })}
//               />
//               <input
//                 type="number"
//                 placeholder="Distance"
//                 className="w-24 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={transportData.distance}
//                 onChange={(e) => setTransportData({ ...transportData, distance: e.target.value })}
//               />
//               <select
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={transportData.unit}
//                 onChange={(e) => setTransportData({ ...transportData, unit: e.target.value })}
//               >
//                 <option value="km">km</option>
//               </select>
//               <button
//                 onClick={updateTransportTotal}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//               >
//                 Update
//               </button>
//             </div>
//             <p className="font-medium text-gray-800">Total Transport Emission: {transportTotal.toFixed(2)} kg CO2e</p>
//           </div>
//         )}

//         {activeSection === "Energy" && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Energy Section</h2>
//             <div className="flex gap-2 mb-4">
//               <input
//                 type="text"
//                 placeholder="Activity"
//                 className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={energyData.activity}
//                 onChange={(e) => setEnergyData({ ...energyData, activity: e.target.value })}
//               />
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 className="w-24 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={energyData.amount}
//                 onChange={(e) => setEnergyData({ ...energyData, amount: e.target.value })}
//               />
//               <select
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={energyData.unit}
//                 onChange={(e) => setEnergyData({ ...energyData, unit: e.target.value })}
//               >
//                 <option value="kWh">kWh</option>
//               </select>
//               <button
//                 onClick={updateEnergyTotal}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//               >
//                 Update
//               </button>
//             </div>
//             <p className="font-medium text-gray-800">Total Energy Emission: {energyTotal.toFixed(2)} kg CO2e</p>
//           </div>
//         )}
//       </div>

//       {/* Overall Total */}
//       <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xl font-semibold text-blue-700">
//         Overall Total Emission: {overallTotal.toFixed(2)} kg CO2e
//       </div>
//     </div>
//   );
// };

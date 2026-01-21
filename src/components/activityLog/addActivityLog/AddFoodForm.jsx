import React from "react";
import FormSelect from "../../FormSelect";
import FormInput from "../../FormInput";
import useGetAllFood from "../../../hooks/food/useGetAllFood";

const AddFoodForm = ({
  foodProduct,
  setFoodProduct,
  foodUnit,
  setFoodUnit,
  foodAmount,
  setFoodAmount,
}) => {
  const { options, loading } = useGetAllFood();

  return (
    <section className="mb-6 p-4 border border-[#006400] rounded">
      <h2 className="font-semibold mb-2">Food</h2>

      {loading ? (
        <p>Loading food products...</p>
      ) : (
        <FormSelect
          title="Food Product"
          value={foodProduct}
          onChange={(e) => setFoodProduct(e.target.value)}
          list={options.foodProducts}
        />
      )}

      <FormSelect
        title="Unit"
        value={foodUnit}
        onChange={(e) => setFoodUnit(e.target.value)}
        list={["kg", "g"]}
      />

      <FormInput
        label="Amount"
        type="number"
        min="0"
        value={foodAmount}
        onChange={(e) => setFoodAmount(e.target.value)}
        placeholder="Enter amount"
      />
    </section>
  );
};

export default AddFoodForm;

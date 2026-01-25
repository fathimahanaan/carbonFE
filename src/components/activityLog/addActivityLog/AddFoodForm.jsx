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
  onAddFood,
  foodItems = [],
}) => {
  const { options, loading } = useGetAllFood();

  return (
    <section className="mb-6 p-4 border rounded">
      <h2 className="font-semibold mb-2">Food</h2>

      {loading ? (
        <p>Loading food products...</p>
      ) : (
        <FormSelect
          title="Food Product"
          value={foodProduct}
          onChange={(e) => setFoodProduct(e.target.value)}
          list={options?.foodProducts || []}
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
        value={foodAmount}
        onChange={(e) => setFoodAmount(e.target.value)}
      />

      {onAddFood && (
        <button
          type="button"
          onClick={onAddFood}
          className="mt-3   text-green-700 hover:text-green-200 rounded"
        >
          + Add
        </button>
      )}

      {foodItems.length > 0 && (
        <ul className="mt-4 text-sm">
          {foodItems.map((item, i) => (
            <li key={i}>
              {item.product} – {item.amount} {item.unit}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AddFoodForm;

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
    <section className="mb-6  p-5   ">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-green-700 flex items-center gap-2">
          🍽️ Food Consumption
        </h2>
        <p className="text-sm font-semibold text-gray-600 mt-1">
          Track food intake to estimate emissions from production and supply
          chains.
        </p>
      </div>

      {/* Food product */}
      {loading ? (
        <p className="text-m font-semibold text-gray-500">
          Loading food products…
        </p>
      ) : (
        <>
          <FormSelect
            title="Food Product"
            value={foodProduct}
            onChange={(e) => setFoodProduct(e.target.value)}
            list={options?.foodProducts || []}
          />
          <p className="text-sm font-semibold  text-gray-500 mb-3">
            Select the food item you consumed or purchased.
          </p>
        </>
      )}

      {/* Unit */}
      <FormSelect
        title="Measurement Unit"
        value={foodUnit}
        onChange={(e) => setFoodUnit(e.target.value)}
        list={["kg", "g"]}
      />
      <p className="text-sm font-semibold text-gray-500 mb-3">
        Choose the unit that best matches your quantity.
      </p>

      {/* Amount */}
      <FormInput
        label="Quantity"
        type="number"
        min="0"
        value={foodAmount}
        onChange={(e) => setFoodAmount(e.target.value)}
        placeholder="e.g. 500"
      />
      <p className="text-sm  font-semibold text-gray-500 mt-1">
        Enter the total amount for the selected food item.
      </p>
      <p className="text-sm font-semibold text-orange-600 mt-1">
        Click “Add Food Item” to include food in the calculation.
      </p>

      {/* Add button */}
      {onAddFood && (
        <button
          type="button"
          onClick={onAddFood}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium font-semibold text-green-700 hover:text-orange-500"
        >
          ➕ Add Food Item
        </button>
      )}

      {/* Added items */}
      {foodItems.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Added Food Items
          </p>
          <ul className="space-y-1 text-sm font-semibold text-gray-600">
            {foodItems.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.product}</span>
                <span>
                  {item.amount} {item.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default AddFoodForm;

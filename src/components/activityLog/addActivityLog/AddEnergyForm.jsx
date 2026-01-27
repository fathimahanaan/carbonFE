import React from "react";
import FormSelect from "../../FormSelect";
import FormInput from "../../FormInput";
import useGetEnergyOptions from "../../../hooks/energy/useGetEnergyOptions";

const AddEnergyForm = ({
  energyActivity,
  setEnergyActivity,
  energyUnit,
  setEnergyUnit,
  amount,
  setAmount,
}) => {
  const { options } = useGetEnergyOptions();

  return (
    <section className="mb-6 p-5 border border-white  bg-green-10">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#006400] flex items-center gap-2">
          ⚡ Energy Consumption
        </h2>
        <p className="text-sm font-semibold text-gray-500 mt-1">
          Provide details about energy usage to accurately calculate emissions.
        </p>
      </div>

      {/* Activity */}
      <FormSelect
        title="Energy Activity"
        value={energyActivity}
        onChange={(e) => setEnergyActivity(e.target.value)}
        list={options.activities}
      />
      <p className="text-sm font-semibold text-gray-500 mb-3">
        Example: electricity usage, diesel generator, natural gas, etc.
      </p>

      {/* Unit */}
      <FormSelect
        title="Measurement Unit"
        value={energyUnit}
        onChange={(e) => setEnergyUnit(e.target.value)}
        list={options.units}
      />
      <p className="text-sm font-semibold text-gray-500 mb-3">
        Select the unit that best represents your consumption.
      </p>

      {/* Amount */}
      <FormInput
        label="Consumption Amount"
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g. 250"
      />
      <p className="text-sm font-semibold text-gray-500 mt-1">
        Enter the total amount used for the selected activity.
      </p>
    </section>
  );
};

export default AddEnergyForm;

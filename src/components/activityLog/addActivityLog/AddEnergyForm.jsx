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
    <section className="mb-6 p-4 border border-[#006400] rounded">
      <h2 className="font-semibold mb-2">Energy</h2>

      <FormSelect
        title="Activity"
        value={energyActivity}
        onChange={(e) => setEnergyActivity(e.target.value)}
        list={options.activities}
      />

      <FormSelect
        title="Unit"
        value={energyUnit}
        onChange={(e) => setEnergyUnit(e.target.value)}
        list={options.units}
      />

      <FormInput
        label="Amount"
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
    </section>
  );
};

export default AddEnergyForm;

import React, { useState } from 'react';

// Assumes FormSelect, FormInput, and options are imported from elsewhere
// import { FormSelect, FormInput } from './FormComponents';
// import { options } from './options';

export const AddFoodForm = () => {
  const [foodActivity, setFoodActivity] = useState('');
  const [energyUnit, setEnergyUnit] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <section className="mb-6 p-4 border border-[#006400] rounded">
      <h2 className="font-semibold mb-2">Energy</h2>

      <FormSelect
        title="Activity"
        value={foodActivity}
        onChange={(e) => setFoodActivity(e.target.value)}
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

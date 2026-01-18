import React from "react";

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-[#006400] mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        className="border border-green-500 p-2 w-full rounded"
      />
    </div>
  );
};

export default FormInput;

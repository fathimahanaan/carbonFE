import React from "react";

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default FormInput;

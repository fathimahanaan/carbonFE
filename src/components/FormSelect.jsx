import React from "react";

const FormSelect = ({
  title,
  value,
  onChange,
  list,
  multi = false,
  displayField = "",
  valueField = "",
}) => {
  return (
    <div className="mb-4">
      <label className="block  text-[#006400] font-semibold mb-2">
        {title}
      </label>

      <select
        value={value}
        onChange={onChange}
        multiple={multi}
        className="border border border-green-500 p-2 w-full rounded"
      >
        <option value="" disabled>{`Select ${title}`}</option>

        {list?.map((item, index) => {
          // If item is object
          if (typeof item === "object") {
            const label = displayField ? item[displayField] : item.name;
            const val = valueField ? item[valueField] : item._id || label;

            return (
              <option key={val || index} value={val}>
                {label}
              </option>
            );
          }

        
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;

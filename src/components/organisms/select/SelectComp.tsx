import React from "react";
import Select, { OptionsType, ValueType, StylesConfig } from "react-select";

// Define the prop types
interface SelectCompProps {
  labelClassName?: string;
  label?: string;
  options: OptionsType<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean | string;
  selectedValue?: ValueType<{ value: string; label: string }>;
  name: string;
  disabled?: boolean;
  isClearable?: boolean;
  icon?: React.ReactNode;
  onChange?: (option: ValueType<{ value: string; label: string }>) => void;
  setValue: any;
}

// Custom styles for react-select component
const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    borderColor: state.isFocused ? "#CBD5E0" : "#CBD5E0",
    borderWidth: "2px",
    // Dark gray on focus, light gray otherwise
    boxShadow: "none", // Remove default box shadow
    "&:hover": { backgroundColor: "#F2F2F2" }, // Slightly darker on hover
    borderRadius: "8px", // Rounded corners
    padding: "2px 4px", // Padding within the select box
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#A0AEC0", // Gray color for placeholder text
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#4A5568", // Dark text for selected value
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px", // Rounded corners for menu dropdown
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for dropdown
    marginTop: "4px", // Small margin from the control box
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#EDF2F7"
      : state.isFocused
      ? "#F7FAFC"
      : "#FFF", // Light background on focus and selected
    color: state.isSelected ? "#2D3748" : "#4A5568", // Darker text on selected
    "&:hover": {
      backgroundColor: "#E2E8F0", // Light gray on hover
    },
    padding: "8px 12px", // Padding for options
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: "#A0AEC0", // Gray color for no-options message
  }),
};

const SelectComp: React.FC<SelectCompProps> = ({
  labelClassName = "",
  label,
  options,
  placeholder,
  required,
  selectedValue,
  name,
  disabled = false,
  isClearable = false,
  icon,
  onChange,
  setValue,
}) => {
  const handleSelectChange = (
    option: ValueType<{ value: string; label: string }>
  ) => {
    if (onChange) {
      onChange(option);
    } else {
      setValue((option as { value: string })?.value);
    }
  };

  return (
    <div>
      {label && (
        <label className={`${labelClassName} text-gray-700`}>{label}</label>
      )}
      <Select
        className="text-gray-400"
        styles={customStyles}
        isDisabled={disabled}
        options={options}
        placeholder={placeholder || "Choose"}
        isClearable={isClearable}
        value={selectedValue}
        onChange={handleSelectChange}
        noOptionsMessage={() => " No Data Available"}
      />
    </div>
  );
};

export default SelectComp;

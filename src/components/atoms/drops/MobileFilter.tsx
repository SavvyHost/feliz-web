import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import CustomSvgIcon from "./CustomSvgIcon";

interface FilterOption {
  label: string;
  options: string[];
}

interface MobileFilterProps {
  options: FilterOption[];
  selectedOptions: Record<string, string>; // change from string[] to object for flexibility
  onSelectChange: (label: string, value: string) => void;
  onOpenModal: () => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  options,
  selectedOptions,
  onSelectChange,
  onOpenModal,
}) => {
  return (
    <div className="flex items-center w-full">
      <div className="w-10/12 whitespace-nowrap overflow-x-scroll">
        <div className="flex">
          {options.map((filter) => (
            <DropdownMenu
              key={filter.label}
              label={filter.label}
              options={filter.options}
              selectedOption={selectedOptions[filter.label] || ""}
              onSelectChange={(value) => onSelectChange(filter.label, value)}
            />
          ))}
        </div>
      </div>
      {/* Vertical Line Separator */}
      <div className="border-l h-10 border-gray-400 mx-4"></div>
      <div
        className="hover:bg-gray-100 cursor-pointer bg-white border-2 border-gray-200 p-2 flex text-nowrap justify-between capitalize items-center gap-2 text-sm font-bold rounded-lg text-gray-500"
        onClick={onOpenModal}
      >
        <CustomSvgIcon />
      </div>
    </div>
  );
};

export default MobileFilter;

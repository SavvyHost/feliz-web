import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4 ">
      <button
        className="flex justify-between items-center  w-full text-left font-segoe text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <ChevronUp size={20} color="black" />
        ) : (
          <ChevronDown size={20} color="black" />
        )}
      </button>
      {isOpen && <div className="mt-2 ">{children}</div>}
    </div>
  );
};

export default FilterSection;

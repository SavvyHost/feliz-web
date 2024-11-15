import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectChange: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  selectedOption,
  onSelectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      // Calculate position for the dropdown menu
      const rect = dropdownRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({ top: rect.bottom + window.scrollY, left: rect.left });
      }
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option: string) => {
    onSelectChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative min-w-[120px] px-2 py-1">
      <div
        className="w-full bg-white border-2 border-gray-300 hover:bg-gray-100 transition-colors rounded-lg p-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-gray-900 text-nowrap ${
            !selectedOption && "text-gray-500"
          }`}
        >
          {selectedOption || label}
        </span>
        <ChevronDown className="text-gray-500" />
      </div>

      {isOpen &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: dropdownRef.current?.offsetWidth,
            }}
            className="z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer hover:bg-gray-200 transition-colors p-2"
              >
                {option}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default DropdownMenu;

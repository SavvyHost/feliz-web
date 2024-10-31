import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onSelectChange(event.target.value);
  };

  return (
    <div ref={dropdownRef} className="relative min-w-[120px] px-2 py-1">
      {isMobile ? (
        <FormControl
          fullWidth
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              borderRadius: "0.5rem",
              border: "2px solid #E5E7EB",
              "&:hover": {
                border: "2px solid #D1D5DB",
                backgroundColor: "#E5E7EB",
              },
              "&.Mui-focused": {
                border: "2px solid #9CA3AF",
              },
              "& fieldset": {
                border: "none",
              },
            },
          }}
        >
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            displayEmpty
            IconComponent={ChevronDown}
            renderValue={(selected) => (
              <span className={selected ? "text-gray-900" : "text-black"}>
                {selected || label}
              </span>
            )}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 300 },
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              disableScrollLock: true,
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                value={option}
                className="px-4 py-2 hover:bg-gray-100"
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <div
          className="w-full bg-white border-2 border-gray-300  hover:bg-gray-100 transition-colors rounded-lg p-2 cursor-pointer flex justify-between items-center"
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
      )}

      {!isMobile && isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer hover:bg-gray-200 transition-colors p-2"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

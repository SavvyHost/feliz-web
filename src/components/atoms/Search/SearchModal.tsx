import React, { useState } from "react";
import {
  Modal,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ChevronDown, Search } from "lucide-react";

interface SearchModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  locations: string[];
  months: string[];
}

const SearchModal: React.FC<SearchModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  locations,
  months,
}) => {
  const [location, setLocation] = useState<string>("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] =
    useState<boolean>(false);
  const [month, setMonth] = useState<string>("");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] =
    useState<boolean>(false);
  const [option, setOption] = useState<string>("");

  const options = ["Packages", "Nile Cruise", "Excursions"];

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex items-center justify-center p-4"
    >
      <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
        <div className="bg-white rounded-lg p-4 max-w-md w-full md:max-w-lg md:w-auto h-auto flex flex-col">
          {/* Location Input */}
          <div className="relative mb-3">
            <input
              type="text"
              value={location}
              onFocus={() => setIsLocationDropdownOpen(true)}
              onBlur={() =>
                setTimeout(() => setIsLocationDropdownOpen(false), 200)
              }
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where"
              className="bg-transparent rounded-md pl-3 pr-10 py-2 focus:outline-none w-full cursor-pointer border border-gray-300"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            {isLocationDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="px-3 py-2 hover:bg-yellow-200 text-sm cursor-pointer"
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationDropdownOpen(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Month Input */}
          <div className="relative mb-4">
            <input
              type="text"
              value={month}
              onFocus={() => setIsMonthDropdownOpen(true)}
              onBlur={() =>
                setTimeout(() => setIsMonthDropdownOpen(false), 200)
              }
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Select month"
              className="bg-transparent rounded-md pl-3 pr-10 py-2 focus:outline-none w-full cursor-pointer border border-gray-300"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-transparent" />
            {isMonthDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="grid grid-cols-2 gap-0.5 p-2">
                  <div className="flex flex-col">
                    {months.slice(0, 6).map((m) => (
                      <div
                        key={m}
                        className="px-3 py-2 hover:bg-yellow-200 text-sm cursor-pointer"
                        onClick={() => {
                          setMonth(m);
                          setIsMonthDropdownOpen(false);
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {months.slice(6).map((m) => (
                      <div
                        key={m}
                        className="px-3 py-2 hover:bg-yellow-200 text-sm cursor-pointer"
                        onClick={() => {
                          setMonth(m);
                          setIsMonthDropdownOpen(false);
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Options Select */}
          <FormControl size="small" margin="dense" className="flex-1 mb-4">
            <InputLabel id="option-label">Options</InputLabel>
            <Select
              labelId="option-label"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              label="Options"
            >
              {options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Search Button */}
          <button
            className="bg-[#232323] text-white font-segoe rounded-md px-4 py-2 w-full flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <Search className="mr-2 w-5 h-5" />
            Search
          </button>
        </div>
      </Slide>
    </Modal>
  );
};

export default SearchModal;

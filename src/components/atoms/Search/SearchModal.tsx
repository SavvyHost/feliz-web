import React, { useState } from "react";
import { Modal } from "@mui/material";
import { ChevronDown, Search } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon
import Filter from "@/components/templates/laptop/Filter";

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

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex items-start justify-center"
    >
      <div className="absolute top-0 left-0 right-0 p-4 bg-white rounded-none shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-green-500"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col">
          {/* <div className="relative mb-3">
            <input
              type="text"
              value={location}
              onFocus={() => setIsLocationDropdownOpen(true)}
              onBlur={() =>
                setTimeout(() => setIsLocationDropdownOpen(false), 200)
              }
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where"
              className="bg-transparent rounded-md pl-3 pr-10 py-2 focus:outline-none w-full cursor-pointer border border-green-300"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
            {isLocationDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-green-300 rounded-md shadow-lg">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="px-3 py-2 hover:bg-green-200 text-sm cursor-pointer"
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
              className="bg-transparent rounded-md pl-3 pr-10 py-2 focus:outline-none w-full cursor-pointer border border-green-300"
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-transparent" />
            {isMonthDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-blue-300 rounded-md shadow-lg">
                <div className="grid grid-cols-2 gap-0.5 p-2">
                  <div className="flex flex-col">
                    {months.slice(0, 6).map((m) => (
                      <div
                        key={m}
                        className="px-3 py-2 hover:bg-blue-200 text-sm cursor-pointer"
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
                        className="px-3 py-2 hover:bg-blue-200 text-sm cursor-pointer"
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
          </div> */}

          <Filter />
          <button
            className="bg-green-800 text-white font-segoe rounded-md px-4 mt-4 py-2 w-full flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <Search className="mr-2 w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface LocationDropdownProps {
  location: string;
  setLocation: (loc: string) => void;
  locations: string[];
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  location,
  setLocation,
  locations,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={location}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Where"
        className="bg-transparent rounded-md pl-3 pr-10 py-[6px]  text-black hover:bg-gray-100 bg-white border-2 border-gray-300 focus:outline-none w-full cursor-pointer"
      />
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {locations.map((loc) => (
            <div
              key={loc}
              className="px-4 py-2 hover:bg-gray-200 font-segoe text-sm cursor-pointer"
              onClick={() => {
                setLocation(loc);
                setIsDropdownOpen(false);
              }}
            >
              {loc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;

import React from "react";

interface LocationDropdownProps {
  locations: string[];
  setLocation: (location: string) => void;
  setIsLocationDropdownOpen: (open: boolean) => void;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  locations,
  setLocation,
  setIsLocationDropdownOpen,
}) => {
  return (
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
  );
};

export default LocationDropdown;

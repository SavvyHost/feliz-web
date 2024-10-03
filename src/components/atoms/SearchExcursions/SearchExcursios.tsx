import React, { useState } from "react";
import LocationDropdown from "./LocationDropdown";
import SearchModal from "./SearchModal";
import Button from "@mui/material/Button";
import { Search } from "lucide-react";
import dayjs from "dayjs";
import DatePickerInput from "./DataPickerInput"; // Import the new component

type DateRange = [Date | null, Date | null];

const SearchExcursions: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const locations: string[] = ["New York", "London", "Paris", "Tokyo"];

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      setDateRange([newValue.toDate(), newValue.add(1, "day").toDate()]);
    }
  };

  return (
    <div>
      {/* Mobile Button */}
      <Button
        className="fixed top-[67px] w-full left-0 z-30 sm:hidden bg-white text-gray-400 font-segoe rounded-md  py-4 hover:bg-white"
        onClick={() => setOpenModal(true)}
      >
        Search For an excursion or activity <Search className="ml-4" />
      </Button>

      {/* Full Search Component for larger screens, hidden on mobile */}
      <div className="relative hidden sm:flex flex-col sm:flex-row items-center bg-white rounded-md mt-5 border border-gray-100 p-5 space-y-2 sm:space-y-0 sm:space-x-2 mx-auto max-w-2xl w-full">
        <LocationDropdown
          location={location}
          setLocation={setLocation}
          locations={locations}
        />
        <div className="w-px bg-gray-300 h-8 hidden sm:block"></div>

        {/* Use the DatePickerInput component here */}
        <DatePickerInput
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          mobileWidth="100%" // Full width on mobile
          laptopWidth="40%" // Fixed width on laptop
          height="40px"
          labelProps={{
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.6)",
            transform: "translate(14px, 12px) scale(1)",
          }}
        />

        <button className="hidden sm:block bg-[#232323] text-white font-segoe rounded-md px-4 py-2 flex items-center text-center justify-center">
          Search
        </button>
      </div>

      {/* Search Modal */}
      <SearchModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        location={location}
        setLocation={setLocation}
        locations={locations}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
    </div>
  );
};

export default SearchExcursions;

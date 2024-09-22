import React, { useState } from "react";
import LocationDropdown from "./LocationDropdown";
import SearchModal from "./SearchModal";
import Button from "@mui/material/Button";
import { Search } from "lucide-react";

import dayjs from "dayjs";
import DatePickerModal from "@/components/molecules/dataPicker";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type DateRange = [Date | null, Date | null];

const SearchExcursions: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDatePickerModal, setOpenDatePickerModal] =
    useState<boolean>(false);
  const [option, setOption] = useState<string>("");

  const locations: string[] = ["New York", "London", "Paris", "Tokyo"];
  const options: string[] = ["Packages", "Nile Cruise", "Excursions"];

  const handleDateChange = (date: dayjs.Dayjs | null, rangeDays: number) => {
    const endDate = date ? date.add(rangeDays - 1, "day").toDate() : null;
    setDateRange([date?.toDate() || null, endDate]);
  };

  const formatDateRange = () => {
    const [start, end] = dateRange;
    if (start && end) {
      return `${start.toLocaleDateString()} to ${end.toLocaleDateString()}`;
    }
    return "Select dates";
  };

  return (
    <div>
      {/* Mobile Button */}
      <Button
        className="fixed top-14 w-full left-0 z-40 sm:hidden bg-white text-gray-400 font-segoe rounded-md px-4 py-4 hover:bg-white"
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

        {/* Input to trigger DatePickerModal */}
        <input
          type="text"
          readOnly
          value={formatDateRange()}
          onClick={() => setOpenDatePickerModal(true)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-[200px] cursor-pointer"
        />

        {/* Options Select */}
        <FormControl size="small" className="flex-1 mb-4 sm:mb-0 sm:w-[200px]">
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
        setOpenDatePickerModal={setOpenDatePickerModal}
      />

      {/* Date Picker Modal */}
      <DatePickerModal
        open={openDatePickerModal}
        onClose={() => setOpenDatePickerModal(false)}
        onDateChange={handleDateChange}
      />
    </div>
  );
};

export default SearchExcursions;

import React, { useState } from "react";
import { Button, Modal, Slide, IconButton, Input } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Dropdown from "./Dropdown";
import { ChevronDown, Plus, Minus, X } from "lucide-react";
import { Dayjs } from "dayjs";
import DatePickerModal from "@/components/molecules/dataPicker";
import Thanks from "@/components/molecules/Thanks";

const locations = ["New York", "London", "Paris", "Tokyo"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Define E164Number type if not imported
type E164Number = string;

export default function BookingFormModal() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);
  const [location, setLocation] = useState("Where");
  const [month, setMonth] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<E164Number>(""); // Use E164Number type for phone input
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [rangeDays, setRangeDays] = useState(1);
  const [showThanks, setShowThanks] = useState(false); // State to control Thanks component

  const handleDateChange = (date: Dayjs | null, days: number) => {
    setSelectedDate(date);
    setRangeDays(days);
  };

  const handleSubmit = () => {
    setShowThanks(true); // Show Thanks component on submit
    setIsModalOpen(false); // Close the booking form modal
  };

  const handleCloseThanks = () => {
    setShowThanks(false); // Hide Thanks component
  };

  return (
    <>
      <Button
        className="py-2 capitalize w-full bg-custom-gradient text-white rounded-none hover:bg-yellow-500 transition duration-300 font-segoe fixed top-16 right-0 z-40 md:hidden"
        onClick={() => setIsModalOpen(true)}
      >
        Open Booking Form
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex w-full h-full"
      >
        <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
          <div className="bg-white w-full h-full flex flex-col p-6 relative">
            {/* Close Icon */}
            <IconButton
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={24} />
            </IconButton>

            <div className="flex-1 overflow-y-auto">
              <h2 className="text-sm text-gray-500 mb-2">From $2000</h2>
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                US $1000
              </h1>

              <form className="space-y-6">
                <Dropdown
                  items={locations}
                  selectedItem={location}
                  onSelect={setLocation}
                  placeholder="Where"
                  isDropdownOpen={isLocationDropdownOpen}
                  setIsDropdownOpen={setIsLocationDropdownOpen}
                />

                <Dropdown
                  items={months}
                  selectedItem={month}
                  onSelect={setMonth}
                  placeholder="Select month"
                  isDropdownOpen={isMonthDropdownOpen}
                  setIsDropdownOpen={setIsMonthDropdownOpen}
                />

                <div className="relative flex items-center">
                  <PhoneInput
                    placeholder="Enter Your Number"
                    value={value}
                    onChange={(newValue) => setValue(newValue || "")} // Handle the E164Number type
                    defaultCountry="US"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative ">
                  <Input
                    type="text"
                    placeholder="Start Date"
                    value={
                      selectedDate
                        ? `${selectedDate.format(
                            "YYYY-MM-DD"
                          )} to ${selectedDate
                            .add(rangeDays - 1, "day")
                            .format("YYYY-MM-DD")}`
                        : "Select a date range"
                    }
                    onClick={() => setIsDatePickerModalOpen(true)}
                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select Your Nationality"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <textarea
                  placeholder="Tell us More Details"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                ></textarea>

                <div className="space-y-4">
                  {[
                    { label: "Adults", value: adults, setValue: setAdults },
                    {
                      label: "Children",
                      value: children,
                      setValue: setChildren,
                    },
                    { label: "Infants", value: infants, setValue: setInfants },
                  ].map(({ label, value, setValue }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{`Number of ${label}`}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => setValue(Math.max(0, value - 1))}
                          className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                        >
                          <Minus size={16} />
                        </Button>
                        <span>{value}</span>
                        <Button
                          onClick={() => setValue(value + 1)}
                          className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </div>

            <div className="pt-4">
              <Button
                className="w-full p-3 bg-[#986518] text-white rounded-md hover:bg-yellow-700 transition duration-150"
                onClick={handleSubmit} // Handle submit to show Thanks component
              >
                Submit
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>

      {/* Date Picker Modal */}
      <DatePickerModal
        open={isDatePickerModalOpen}
        onClose={() => setIsDatePickerModalOpen(false)}
        onDateChange={handleDateChange}
      />

      {/* Thanks Modal */}
      {showThanks && (
        <Thanks
          onClose={handleCloseThanks}
          message="Your booking has been successfully submitted."
        />
      )}
    </>
  );
}

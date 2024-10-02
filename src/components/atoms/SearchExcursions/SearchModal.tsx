import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LocationDropdown from "./LocationDropdown";
import DatePickerInput from "./DataPickerInput";
import dayjs from "dayjs";

type DateRange = [Date | null, Date | null];

interface SearchModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  location: string;
  setLocation: (location: string) => void;
  locations: string[];
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  openModal,
  setOpenModal,
  location,
  setLocation,
  locations,
  dateRange,
  setDateRange,
}) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const formatDateRange = () => {
    const [start, end] = dateRange;
    if (start && end) {
      return `${start.toLocaleDateString()} to ${end.toLocaleDateString()}`;
    }
    return "Select dates";
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      setDateRange([newValue.toDate(), newValue.add(1, "day").toDate()]);
    }
  };

  const handleSearch = () => {
    // Add logic to handle the search action, e.g., fetching data based on location and date range
    console.log(
      "Searching for excursions in",
      location,
      "from",
      formatDateRange()
    );
    setOpenModal(false); // Close modal after searching
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      className="flex items-start justify-center p-0"
    >
      <Box
        sx={{
          width: "100%", // Full width
          maxWidth: "none", // Disable max width
          bgcolor: "background.paper",
          borderRadius: 0, // Remove border radius for full-screen modal
          boxShadow: 24,
          p: 2,
          position: "relative", // For positioning close button
          minHeight: "10vh", // Full screen height
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpenModal(false)}
          sx={{
            position: "absolute",
            top: 5,
            right: 16,
            zIndex: 10, // Ensure the button is above all other content
          }}
        >
          <CloseIcon className="text-green-700" />
        </IconButton>

        <div className="flex flex-col space-y-4 mt-10">
          <LocationDropdown
            location={location}
            setLocation={setLocation}
            locations={locations}
          />
          <DatePickerInput
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            mobileWidth="100%" // Full width on mobile
            laptopWidth="100%" // Fixed width on laptop
            height="40px"
            labelProps={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.6)",
              transform: "translate(14px, 12px) scale(1)",
            }}
          />
          <Button
            onClick={handleSearch} // Use handleSearch to handle the search logic
            variant="contained"
            color="primary"
            fullWidth
            className="bg-green-700"
          >
            Search
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SearchModal;

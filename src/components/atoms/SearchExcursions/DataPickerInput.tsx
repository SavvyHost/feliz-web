import React, { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { useMediaQuery, Theme } from "@mui/material";

interface DatePickerInputProps {
  selectedDate: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  mobileWidth?: string;
  laptopWidth?: string;
  height?: string;
  labelProps?: {
    fontSize?: string;
    color?: string;
    transform?: string;
  };
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  selectedDate,
  onDateChange,
  mobileWidth = "100%",
  laptopWidth = "400px",
  height = "56px",
  labelProps = {
    fontSize: "19px",
    color: "rgba(0, 0, 0, 0.6)",
    transform: "translate(14px, 16px) scale(1)",
  },
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  // Use media query to determine if it's mobile or laptop
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    onDateChange(newValue);
    setIsDatePickerOpen(false);
  };

  const handleInputClick = () => {
    setIsDatePickerOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        open={isDatePickerOpen}
        onOpen={handleInputClick}
        onClose={() => setIsDatePickerOpen(false)}
        slotProps={{
          textField: {
            onClick: handleInputClick,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                handleInputClick();
              }
            },
            sx: {
              width: isLaptop ? laptopWidth : mobileWidth, // Set width based on screen size
              height,
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiInputBase-input": {
                height: "100%",
                padding: "0 14px",
              },
              "& .MuiInputLabel-root": {
                ...labelProps,
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
              },
            },
            fullWidth: false,
            variant: "outlined",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;

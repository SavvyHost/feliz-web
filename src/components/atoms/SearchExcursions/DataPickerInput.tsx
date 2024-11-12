// DatePickerInput.tsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
  isOpen?: boolean; // New prop to control date picker opening
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
  isOpen = false, // Default value for isOpen prop
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isLabelVisible, setIsLabelVisible] = useState<boolean>(true);
  const isLaptop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  // Effect to handle external opening of date picker
  useEffect(() => {
    if (isOpen) {
      setIsDatePickerOpen(true);
      setIsLabelVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsLabelVisible(!selectedDate);
  }, [selectedDate]);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    onDateChange(newValue);
    setIsDatePickerOpen(false);
  };

  const handleInputClick = () => {
    setIsLabelVisible(false);
    setIsDatePickerOpen(true);
  };

  const handleClosePicker = () => {
    setIsDatePickerOpen(false);
    if (!selectedDate) {
      setIsLabelVisible(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={isLabelVisible ? "Select Date" : ""}
        value={selectedDate}
        onChange={handleDateChange}
        open={isDatePickerOpen}
        onOpen={handleInputClick}
        onClose={handleClosePicker}
        desktopModeMediaQuery="(min-width: 0px)"
        slotProps={{
          textField: {
            onClick: handleInputClick,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                handleInputClick();
              }
            },
            sx: {
              width: isLaptop ? laptopWidth : mobileWidth,
              height,
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                borderRadius: "0.4rem",
                border: "2px solid #cccccc",
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
              "& .MuiInputBase-input": {
                height: "100%",
                padding: "0 18px",
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
          popper: {
            sx: {
              "& .MuiPaper-root": {
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;

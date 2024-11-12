import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Plus, Minus } from "lucide-react";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";

interface PickerBookProps {
  onDateChange: (date: string | null, rangeDays: number) => void;
  setFieldValue: (field: string, value: any) => void;
}

// Custom styled components for MUI with consistent desktop view
const CustomDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: 5,
    backgroundColor: "#e5e7eb",
    border: "1px solid #B2BEB5",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#d1d5db",
    },
    "&.Mui-focused": {
      borderColor: "#9ca3af",
      boxShadow: "0 0 0 2px rgba(156, 163, 175, 0.2)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    padding: "6px 14px",
    cursor: "pointer",
    "&::placeholder": {
      color: "#6b7280",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#6b7280",
  },
  // Override mobile view styles to match desktop
  "& .MuiPickersPopper-root": {
    position: "fixed",
    bottom: "unset",
    top: "auto",
    left: "50%",
    transform: "translateX(-50%)",
    width: "auto",
    maxWidth: "325px",
    "@media (max-width: 600px)": {
      position: "fixed",
      maxWidth: "90vw",
    },
  },
}));

const PickerBook: React.FC<PickerBookProps> = ({
  onDateChange,
  setFieldValue,
}) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [rangeDays, setRangeDays] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      onDateChange(formattedDate, rangeDays);
      setFieldValue("start_at", formattedDate);
      setFieldValue("duration", rangeDays);
    }
  }, [selectedDate, rangeDays, onDateChange, setFieldValue]);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
    setIsDatePickerOpen(false);
  };

  const incrementDays = () => {
    setRangeDays((prev) => Math.min(prev + 1, 30));
  };

  const decrementDays = () => {
    setRangeDays((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-4">
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            open={isDatePickerOpen}
            onOpen={() => setIsDatePickerOpen(true)}
            onClose={() => setIsDatePickerOpen(false)}
            minDate={dayjs()}
            desktopModeMediaQuery="@media (min-width: 0px)" // Force desktop mode always
            slotProps={{
              textField: {
                placeholder: "Select Start Date",
                onClick: () => setIsDatePickerOpen(true),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    setIsDatePickerOpen(true);
                  }
                },
                className: "w-full",
              },
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    borderRadius: 8,
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    "@media (max-width: 600px)": {
                      margin: "0 auto",
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxWidth: "90vw",
                      maxHeight: "90vh",
                      overflow: "auto",
                    },
                  },
                  // Ensure the calendar view matches desktop style
                  "& .MuiPickersLayout-root": {
                    display: "flex",
                    flexDirection: "column",
                    "@media (max-width: 600px)": {
                      minWidth: "280px",
                    },
                  },
                },
              },
              layout: {
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiPickersLayout-actionBar": {
                    paddingBottom: 2,
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {selectedDate && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Duration (days)
          </label>
          <div className="flex items-center border border-gray-300 rounded-md divide-x divide-gray-300">
            <button
              type="button"
              onClick={decrementDays}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center py-2">
              {rangeDays} {rangeDays === 1 ? "day" : "days"}
            </div>
            <button
              type="button"
              onClick={incrementDays}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            End date:{" "}
            {selectedDate.add(rangeDays - 1, "day").format("MMM DD, YYYY")}
          </div>
        </div>
      )}
    </div>
  );
};

export default PickerBook;

import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useFormikContext } from "formik";

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  onDateChange: (formattedDate: string, rangeDays: number) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  open,
  onClose,
  onDateChange,
  setFieldValue,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [rangeDays, setRangeDays] = useState<number>(1); // Total days
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDate && dayjs.isDayjs(selectedDate)) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      onDateChange(formattedDate, rangeDays); // Pass formatted date
    }
  }, [selectedDate, rangeDays, onDateChange]);

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue && dayjs.isDayjs(newValue)) {
      const formattedDate = newValue.format("YYYY-MM-DD"); // Ensure formatted date
      setSelectedDate(dayjs(formattedDate)); // Update state with formatted date
    }
    setIsDatePickerOpen(false);
  };

  const incrementDays = () => {
    setRangeDays((prevDays) => prevDays + 1);
  };

  const decrementDays = () => {
    setRangeDays((prevDays) => Math.max(1, prevDays - 1));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Select Date and Range</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
            <Typography variant="h6">Select a Date</Typography>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              open={isDatePickerOpen}
              onOpen={() => setIsDatePickerOpen(true)}
              onClose={() => setIsDatePickerOpen(false)}
              slotProps={{
                textField: {
                  onClick: () => setIsDatePickerOpen(true),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      setIsDatePickerOpen(true);
                    }
                  },
                  fullWidth: true,
                },
              }}
            />
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography variant="h6" className="" sx={{ mr: 2 }}>
                Total Days: {rangeDays}
              </Typography>
              <Button
                className="bg-green-600 text-white hover:bg-green-500 border border-green-500 hover:border-green-700"
                variant="outlined"
                onClick={decrementDays}
                disabled={rangeDays <= 1}
              >
                -
              </Button>
              <Button
                variant="outlined"
                className="bg-green-600 text-white hover:bg-green-500 border border-green-500 hover:border-green-700"
                onClick={incrementDays}
                sx={{ ml: 1 }}
              >
                +
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              (Nights: {rangeDays - 1})
              <br />
              Selected range:{" "}
              {selectedDate && dayjs.isDayjs(selectedDate)
                ? `${selectedDate?.format("YYYY-MM-DD")} to ${selectedDate
                    ?.add(rangeDays - 1, "day")
                    .format("YYYY-MM-DD")}`
                : "None"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (selectedDate && dayjs.isDayjs(selectedDate)) {
                const formattedDate = selectedDate?.format("YYYY-MM-DD"); // Format date before applying
                onDateChange(formattedDate, rangeDays); // Pass formatted date
                onClose();
              }
              setFieldValue("duration", rangeDays);
            }}
            variant="contained"
            className="bg-green-900 hover:bg-green-600"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default DatePickerModal;

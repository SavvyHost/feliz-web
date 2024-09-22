import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  onDateChange: (date: Dayjs | null, rangeDays: number) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  open,
  onClose,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [rangeDays, setRangeDays] = useState<number>(1);

  useEffect(() => {
    if (selectedDate) {
      const endDate = selectedDate.add(rangeDays - 1, "day");
      onDateChange(selectedDate, rangeDays);
    }
  }, [selectedDate, rangeDays, onDateChange]);

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
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" className="mb-5">
                Select Number of Days
              </Typography>
              <TextField
                type="number"
                label="Number of Days"
                value={rangeDays}
                onChange={(e) => setRangeDays(Number(e.target.value))}
                inputProps={{ min: 1 }}
                fullWidth
              />
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Selected date:{" "}
              {selectedDate ? selectedDate.format("YYYY-MM-DD") : "None"}
              <br />
              Selected range:{" "}
              {selectedDate
                ? `${selectedDate.format("YYYY-MM-DD")} to ${selectedDate
                    .add(rangeDays - 1, "day")
                    .format("YYYY-MM-DD")}`
                : "None"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (selectedDate) {
                const endDate = selectedDate.add(rangeDays - 1, "day");
                onDateChange(selectedDate, rangeDays);
                onClose();
              }
            }}
            variant="contained"
            className="bg-custom-gradient"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default DatePickerModal;

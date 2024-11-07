import React, { useState } from "react";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid,
  Typography,
  Paper,
  Fade,
} from "@mui/material"; // Still using MUI components for some elements
import { Calendar, Clock } from "lucide-react";
import DatePickerInput from "@/components/atoms/SearchExcursions/DataPickerInput";
import dayjs from "dayjs";

type DateRange = [Date | null, Date | null];

interface CityDetailsProps {
  formData: any;
  onChange: (stepData: any) => void;
}

const TimeDetails: React.FC<CityDetailsProps> = ({ formData, onChange }) => {
  const [dateOption, setDateOption] = useState("approximate");
  const [approximateMonth, setApproximateMonth] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);

  const handleDateOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateOption(event.target.value);
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      setDateRange([newValue.toDate(), newValue.add(1, "day").toDate()]);
    }
  };

  const handleApproximateDateChange = (month: string, duration: string) => {
    const updatedApproximateDates = { approximateMonth: month, duration };
    onChange(updatedApproximateDates);
    setApproximateMonth(month);
    setDuration(duration);
  };

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

  const durations = [
    "Less than a week",
    "1 week",
    "2 weeks",
    "3 weeks",
    "More than 3 weeks",
  ];

  return (
    <div className="pt-4 mb-3 lg:px-40">
      <Typography
        variant="h4"
        gutterBottom
        className="text-3xl font-bold text-green-800 mb-6"
      >
        When will you embark on your journey?
      </Typography>
      <RadioGroup
        value={dateOption}
        onChange={handleDateOptionChange}
        className="flex flex-row space-x-4 mb-8"
      >
        <FormControlLabel
          value="approximate"
          control={<Radio color="primary" />}
          label={
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-lg">I have approximate dates</span>
            </div>
          }
        />
        <FormControlLabel
          value="exact"
          control={<Radio color="primary" />}
          label={
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <span className="text-lg">I know the exact dates</span>
            </div>
          }
        />
      </RadioGroup>

      <Fade in={dateOption === "exact"}>
        <div className={dateOption === "exact" ? "block" : "hidden"}>
          <DatePickerInput
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            mobileWidth="100%"
            laptopWidth="50%"
            height="50px"
            labelProps={{
              fontSize: "16px",
              color: "rgba(0, 0, 0, 0.7)",
              transform: "translate(14px, 16px) scale(1)",
            }}
          />
        </div>
      </Fade>

      <Fade in={dateOption === "approximate"}>
        <div className={dateOption === "approximate" ? "block" : "hidden"}>
          <Typography
            variant="h6"
            className="font-semibold text-green-700 mb-4"
          >
            Which month do you plan to travel?
          </Typography>
          <Grid container spacing={2} className="mb-8">
            {months.map((month) => (
              <Grid item key={month} xs={6} sm={4} md={3}>
                <button
                  className={`w-full h-12 rounded-lg transition-transform duration-200 ${
                    approximateMonth === month
                      ? "bg-green-500 text-white transform translate-y-[-2px]"
                      : "bg-white border border-green-300 text-green-700"
                  } hover:shadow-lg`}
                  onClick={() => handleApproximateDateChange(month, duration)}
                >
                  {month}
                </button>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h6"
            className="font-semibold text-green-700 mb-4"
          >
            How long will your adventure last?
          </Typography>
          <Grid container spacing={2}>
            {durations.map((length) => (
              <Grid item key={length} xs={12} sm={6} md={4}>
                <button
                  className={`w-full h-12 rounded-lg transition-transform duration-200 ${
                    duration === length
                      ? "bg-green-500 text-white transform translate-y-[-2px]"
                      : "bg-white border border-green-300 text-green-700"
                  } hover:shadow-lg`}
                  onClick={() =>
                    handleApproximateDateChange(approximateMonth, length)
                  }
                >
                  {length}
                </button>
              </Grid>
            ))}
          </Grid>
        </div>
      </Fade>
    </div>
  );
};

export default TimeDetails;

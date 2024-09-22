import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomHeader from "./CustomHeader";

type DateRange = [Date | null, Date | null];

interface DatePickerComponentProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  dateRange,
  setDateRange,
}) => (
  <div className="relative flex-1  sm:block">
    <DatePicker
      selectsRange
      startDate={dateRange[0] || undefined}
      endDate={dateRange[1] || undefined}
      onChange={(update: DateRange) => setDateRange(update)}
      dateFormat="MMMM d, yyyy"
      placeholderText="Select date range"
      className="bg-transparent rounded-md pl-3 pr-10 py-2 border border-gray-300 focus:outline-none w-full cursor-pointer"
      renderCustomHeader={(props) => <CustomHeader {...props} />}
      calendarClassName="custom-calendar"
      dayClassName={(date) =>
        date.getDate() === 9 || date.getDate() === 10 || date.getDate() === 11
          ? "bg-orange-500 text-white rounded-full"
          : "hover:bg-gray-100 rounded-full"
      }
    />
  </div>
);

export default DatePickerComponent;

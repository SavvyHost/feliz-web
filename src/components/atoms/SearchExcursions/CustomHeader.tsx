import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const CustomHeader: React.FC<ReactDatePickerCustomHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="flex justify-between items-center px-2 py-2 bg-white">
    <button
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="text-yellow-500 hover:text-yellow-600"
    >
      <ChevronLeft className="w-4 h-4" />
    </button>
    <span className="text-sm font-segoe">
      {date.toLocaleString("default", { month: "long", year: "numeric" })}
    </span>
    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="text-yellow-500 hover:text-yellow-600"
    >
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

export default CustomHeader;

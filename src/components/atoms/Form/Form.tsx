import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { Button } from "@mui/material";
import { BsLuggageFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Type for the selected date
type DateType = Date | undefined;

export default function BluerForm() {
  const [selectedDate, setSelectedDate] = useState<DateType>(undefined);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleInputClick = (inputType: string) => {
    setActiveInput(inputType);
    setShowCalendar(true);
  };

  const handleDayClick = (day: Date | undefined) => {
    if (day) {
      setSelectedDate(day);
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  return (
    <div className="absolute top-1/2 sm:left-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-full w-4/5 max-w-sm p-4 backdrop-blur-md bg-white/30 rounded-md">
      <div className="py-4 px-2">
        <p className="text-start text-md text-white mb-4">
          Explore the best of Egypt adventure
        </p>

        <form className="space-y-3 relative">
          <div className="flex flex-row space-x-2 mb-3">
            <div className="relative flex-1">
              <BsLuggageFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="text"
                placeholder="Tour Package"
                className={`w-full pl-10 pr-3 py-2 ${
                  activeInput === "tour" ? "bg-[#ebffc5]" : "bg-white"
                } border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 text-sm`}
                onClick={() => handleInputClick("tour")}
                readOnly
                value={
                  activeInput === "tour" && selectedDate
                    ? selectedDate.toDateString()
                    : ""
                }
              />
            </div>

            <div className="relative flex-1">
              <FaBus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="text"
                placeholder="Excursions"
                className={`w-full pl-10 pr-3 py-2 ${
                  activeInput === "excursion" ? "bg-[#ccffc5]" : "bg-white"
                } border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 text-sm`}
                onClick={() => handleInputClick("excursion")}
                readOnly
                value={
                  activeInput === "excursion" && selectedDate
                    ? selectedDate.toDateString()
                    : ""
                }
              />
            </div>
          </div>

          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute left-0 top-10 mt-2 bg-white rounded-md shadow-lg z-50 px-3"
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                onDayClick={handleDayClick} // Updated prop for clicking days
                fromMonth={activeInput === "excursion" ? new Date() : undefined}
                toMonth={activeInput === "excursion" ? undefined : new Date()}
                // Remove showMonthPicker
              />
            </div>
          )}

          <div className="relative mb-3">
            <select className="w-full px-3 py-2 border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
              <option value="Luxor">Luxor</option>
              <option value="Hurghada">Hurghada</option>
              <option value="Sharm">Sharm</option>
              <option value="Marsa alam">Marsa alam</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <div className="flex-1 mb-3 sm:mb-0">
              <input
                type="text"
                placeholder="Enter Date"
                className="w-full px-3 py-2 border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                value={selectedDate ? selectedDate.toDateString() : ""}
                readOnly
              />
            </div>
            <Button className="w-full capitalize sm:w-auto py-2 text-white px-3 bg-green-600 font-segoe rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

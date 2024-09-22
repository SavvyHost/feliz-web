import React from "react";

interface MonthDropdownProps {
  months: string[];
  setMonth: (month: string) => void;
  setIsMonthDropdownOpen: (open: boolean) => void;
}

const MonthDropdown: React.FC<MonthDropdownProps> = ({
  months,
  setMonth,
  setIsMonthDropdownOpen,
}) => {
  return (
    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
      <div className="grid grid-cols-2 gap-0.5 p-2">
        <div className="flex flex-col">
          {months.slice(0, 6).map((m) => (
            <div
              key={m}
              className="px-3 py-2 hover:bg-yellow-200 text-sm cursor-pointer"
              onClick={() => {
                setMonth(m);
                setIsMonthDropdownOpen(false);
              }}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {months.slice(6).map((m) => (
            <div
              key={m}
              className="px-3 py-2 hover:bg-yellow-200 text-sm cursor-pointer"
              onClick={() => {
                setMonth(m);
                setIsMonthDropdownOpen(false);
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthDropdown;

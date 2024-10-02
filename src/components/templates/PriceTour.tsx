import React from "react";
import { Globe, Info } from "lucide-react";

const DateOption = ({
  startDate,
  endDate,
  price,
  status,
  isDiscounted,
  discountPercentage,
}) => (
  <div className="border bg-white rounded-lg p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <div>
        <div className="font-semibold">
          {startDate} <span className="mx-2">→</span> {endDate}
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Globe className="w-4 h-4 mr-1" />
          <span>English</span>
        </div>
      </div>
      <div className="text-right">
        {isDiscounted && (
          <div className="text-sm line-through text-gray-500">${price}</div>
        )}
        <div className="text-xl font-bold">
          $
          {isDiscounted
            ? Math.round(price * (1 - discountPercentage / 100))
            : price}
        </div>
        {isDiscounted && (
          <span className="text-sm text-red-500 font-semibold">
            -{discountPercentage}%
          </span>
        )}
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-sm">
        {status === "almostSoldOut" && (
          <span className="text-red-500 font-semibold">Almost Sold Out</span>
        )}
        {status === "fillingFast" && (
          <span className="text-orange-500 font-semibold">Filling Fast</span>
        )}
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Confirm Dates
      </button>
    </div>
    {(status === "fillingFast" || status === "normal") && (
      <div className="flex justify-between items-center mt-2 text-sm text-blue-600">
        <div className="flex items-center">
          <span>Multiple Room Types</span>
          <Info className="w-4 h-4 ml-1" />
        </div>
        <div>Hold space for 48h</div>
      </div>
    )}
  </div>
);

const TravelDateOptions = () => {
  const options = [
    {
      startDate: "Saturday, 12 Oct, 2024",
      endDate: "Sunday, 20 Oct, 2024",
      price: 1299,
      status: "almostSoldOut",
    },
    {
      startDate: "Saturday, 19 Oct, 2024",
      endDate: "Sunday, 27 Oct, 2024",
      price: 1299,
      status: "fillingFast",
      isDiscounted: true,
      discountPercentage: 15,
    },
    {
      startDate: "Saturday, 26 Oct, 2024",
      endDate: "Sunday, 3 Nov, 2024",
      price: 1299,
      status: "almostSoldOut",
    },
  ];

  return (
    <div className="w-full mt-3 mx-auto">
      {options.map((option, index) => (
        <DateOption key={index} {...option} />
      ))}
    </div>
  );
};

export default TravelDateOptions;

import React from "react";
import {
  FaDoorOpen,
  FaMoneyCheckAlt,
  FaRegClock,
  FaTag,
  FaUser,
} from "react-icons/fa";

type Props = {};

const DefaultDetails = (props: Props) => {
  return (
    <div className="w-full mx-auto border px-4 py-2 mt-2 bg-white border-green-200 rounded-lg shadow-md">
      {" "}
      <ul className="space-y-4 text-lg">
        <li className="flex items-start">
          <FaTag className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">Free cancellation</p>
            <p className="text-gray-600">
              Cancel up to 24 hours in advance for a full refund
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <FaMoneyCheckAlt className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">Reserve now & pay later</p>
            <p className="text-gray-600">
              Keep your travel plans flexible — book your spot and pay nothing
              today.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <FaRegClock className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">
              Check availability to see starting times.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <FaDoorOpen className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">
              Skip the line through a separate entrance
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <FaUser className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">Live tour guide</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DefaultDetails;

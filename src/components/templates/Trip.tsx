import { FC } from "react";
import {
  FaRegClock,
  FaMoneyCheckAlt,
  FaTag,
  FaDoorOpen,
  FaUser,
} from "react-icons/fa";

interface TourDetailsProps {
  DetailTour: {
    title: string;
    description: string;
    duration: string; // Example duration field
    freeCancellation: boolean; // Example field
    payLater: boolean; // Example field
    liveGuideLanguage: string; // Example field
  };
}

const TourDetails: FC<TourDetailsProps> = ({ DetailTour }) => {
  return (
    <div className="w-full mx-auto mt-2 px-4 py-2 border bg-white mb-3 border-green-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">About this tour</h2>
      <h3 className="text-xl font-bold mb-2">{DetailTour.title}</h3>
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: DetailTour.description }}
      />

      <ul className="space-y-4 text-lg">
        <li className="flex items-start">
          <FaTag className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">Free cancellation</p>
            <p className="text-gray-600">
              {DetailTour.freeCancellation
                ? "Cancel up to 24 hours in advance for a full refund"
                : "No free cancellation available"}
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <FaMoneyCheckAlt className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">Reserve now & pay later</p>
            <p className="text-gray-600">
              {DetailTour.payLater
                ? "Keep your travel plans flexible — book your spot and pay nothing today."
                : "Payment required at the time of booking."}
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <FaRegClock className="w-6 h-6 mr-3 text-green-600" />
          <div>
            <p className="font-semibold">Duration 3.5 hours</p>
            <p className="text-gray-600">
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
            <p className="text-gray-600">{DetailTour.liveGuideLanguage}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TourDetails;

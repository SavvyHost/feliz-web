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
    age_range: string;
    run: string;
    category: { name: string };
  };
}

const TripExcusrions: FC<TourDetailsProps> = ({ DetailTour }) => {
  return (
    <div className="w-full mx-auto mt-2 px-4 py-2 border bg-white mb-3 border-green-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">About this tour</h2>

      <div
        className="text-gray-700 "
        dangerouslySetInnerHTML={{ __html: DetailTour.description }}
      />

      {/* Styled List with Flexbox */}

      <ul className="flex flex-wrap gap-4">
        <li className="flex items-center bg-white p-3 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4">
          <FaRegClock className="text-green-500 mr-3" />
          <span className="text-gray-800">
            Duration: {DetailTour.duration} Hours
          </span>
        </li>
        <li className="flex items-center bg-white p-3 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4">
          <FaUser className="text-blue-500 mr-3" />
          <span className="text-gray-800">
            Age Range: {DetailTour.age_range}
          </span>
        </li>
        <li className="flex items-center bg-white p-3 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4">
          <FaDoorOpen className="text-orange-500 mr-3" />
          <span className="text-gray-800">Run: {DetailTour.run}</span>
        </li>
        <li className="flex items-center bg-white p-3 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4">
          <FaTag className="text-purple-500 mr-3" />
          <span className="text-gray-800">
            Category: {DetailTour.category.name}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TripExcusrions;

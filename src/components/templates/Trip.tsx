import React from "react";
import {
  FaClock,
  FaGlobeAmericas,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";
import { TourDetail } from "@/types/tour"; // Import the TourDetail interface

interface TripInfoProps {
  DetailTour: TourDetail; // Use the TourDetail interface for typing
}

const TripInfo: React.FC<TripInfoProps> = ({ DetailTour }) => {
  const items = [
    {
      icon: FaClock,
      title: "Duration",
      value: `${DetailTour.duration} Days`,
      subvalue: `${DetailTour.duration - 1} Nights`,
    },
    {
      icon: FaGlobeAmericas,
      title: "Destination",
      value: `${DetailTour.num_of_cities ?? "N/A"} cities`, // Handle optional property
      subvalue: `${DetailTour.num_of_places ?? "N/A"} places`, // Handle optional property
    },
    {
      icon: FaLock,
      title: "Type",
      value: DetailTour.category?.name ?? "N/A", // Handle optional property
      subvalue: "English Speaking Guide",
    },
    {
      icon: FaCalendarAlt,
      title: "Run",
      value: DetailTour.run ?? "N/A", // Handle optional property
      // subvalue: "Sunday - Thursday",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-segoe text-start mt-9">Trip Information</h2>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <item.icon className="text-3xl text-[#945E13] mb-2" />
            <h3 className="font-semibold text-[#945E13]">{item.title}</h3>
            <p className="text-gray-800">{item.value}</p>
            <p className="text-sm text-gray-500">{item.subvalue}</p>
          </div>
        ))}
      </div>
      <p className="pt-3 text-gray-600">
        Start in Japan is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
};

export default TripInfo;

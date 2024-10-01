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
    <div className="">
      <h2 className="text-3xl font-segoe text-start mt-3 lg:mt-4 ">
        Trip Information
      </h2>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 mt-3 lg:mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <item.icon className="text-3xl text-[#6ece49] mb-2" />
            <h3 className="font-semibold text-[#377020]">{item.title}</h3>
            <p className="text-gray-800">{item.value}</p>
            <p className="text-sm text-gray-500">{item.subvalue}</p>
          </div>
        ))}
      </div>

      <div
        className="font-segoe mt-5 text-xl"
        dangerouslySetInnerHTML={{
          __html: DetailTour.description ?? "No description available.",
        }}
      />
    </div>
  );
};

export default TripInfo;

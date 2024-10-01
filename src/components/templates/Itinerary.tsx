import React from "react";
import Image from "next/image";
import Map from "../../../public/assets/map.jpeg";
import { FaDownload } from "react-icons/fa";
import { Button } from "@mui/material";
import { TourDetail, TourItineraryItem } from "@/types/tour"; // Correct import

interface TourItineraryProps {
  DetailTour: TourDetail;
}

const TourItinerary: React.FC<TourItineraryProps> = ({ DetailTour }) => {
  return (
    <div className="">
      <h2 className="text-3xl font-segoe text-start mt-9 mb-6">Itinerary</h2>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto overflow-hidden">
        {/* Left side - Map */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto">
          <Image
            src={Map}
            alt="Tour Map"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Right side - Scrollable Itinerary with Stepper */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[600px] relative">
          <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-[#A16207]"></div>
          {DetailTour?.tour_itineraries?.map(
            (item: TourItineraryItem, index: number) => (
              <div key={index} className="mb-10 relative pl-12">
                <div className="absolute left-0 -ml-[5px] mt-1.5 w-7 h-7 bg-[#A16207] rounded-full flex items-center justify-center text-white text-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-segoe text-[#A16207] flex items-center">
                  Day {index + 1} : {item.title}
                </h3>
                <p className="mt-2 font-segoe text-gray-700">
                  {item.description}
                </p>
                <p className="mt-1 font-segoe text-sm text-gray-500">
                  {item.duration}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Button with Icon */}
      <Button className="mt-6 flex text-green-900 bg capitalize items-center px-4 py-2 border border-opacity-60 border-green-700 bg-green-100  font-segoe text-lg rounded-md hover:bg-[#1b5e2e] hover:text-white transition-colors duration-300">
        <FaDownload className="mr-2 text-[#53d869]" />
        Download Brochure
      </Button>
    </div>
  );
};

export default TourItinerary;

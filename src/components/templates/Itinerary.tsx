import React, { useState } from "react";
import { Star, Heart, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import ImageItenary from "../../../public/assets/Secondimage.jpeg";

const TourCard = ({ itinerary, index }) => {
  // State to toggle collapse
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle collapse
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full overflow-hidden my-1 ">
      <div className="relative">
        {/* Uncomment the Image if needed */}
        {/* <Image
          src={
            itinerary.place.images.length > 0
              ? itinerary.place.images[0]
              : ImageItenary
          }
          alt={itinerary.place.name}
          className="w-full"
          width={500}
          height={300}
        /> */}
        <div className="absolute top-2 right-2">
          <Heart className="text-white" />
        </div>
      </div>

      {/* Title Section with Collapse Toggle */}
      <div className="px-6 py-4">
        <div
          className="flex justify-between items-center font-bold text-xl mb-2 cursor-pointer"
          onClick={toggleCollapse}
        >
          <span>
            {index + 1}. {itinerary.title}
          </span>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>

        {/* Details section with transition for open/close */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div
            className={`px-2 ${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <div className="text-gray-700 text-base mb-2">
              <p>{itinerary.description}</p>
              <p className="text-gray-600 text-sm">
                {itinerary.city.name} - {itinerary.place.name}
              </p>
              {/* You can uncomment this part if you want to add ratings */}
              {/* <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="text-yellow-400" />
                ))}
                <span className="ml-1 text-gray-600 text-sm">4.9 (32)</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TourItinerary = ({ DetailTour }) => {
  return (
    <div className="flex flex-wrap border-green-200  border rounded-lg bg-white">
      <h1 className="text-2xl font-bold mt-2 ml-3 bg-white">
        Tour Itineraries
      </h1>
      {DetailTour.tour_itineraries.map((itinerary, index) => (
        <TourCard key={itinerary.id} itinerary={itinerary} index={index} />
      ))}
    </div>
  );
};

const TourPage = ({ DetailTour }) => {
  return (
    <div className="my-2">
      <TourItinerary DetailTour={DetailTour} />
    </div>
  );
};

export default TourPage;

import React, { useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TourCard = ({ itinerary, index, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full overflow-hidden my-1 relative">
      {/* Vertical line and dot */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-300">
        <div className="absolute left-1/2 top-6 w-4 h-4 rounded-full bg-green-500 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content moved to the right */}
      <div className="lg:ml-10 ml-5">
        <div className="px-6 py-4">
          <div
            className="flex justify-between items-center font-semibold text-base lg:text-xl mb-2 cursor-pointer"
            onClick={toggleCollapse}
          >
            <span>
              Day {index + 1}: {itinerary.title}
            </span>
            {isOpen ? (
              <div>
                <FaChevronUp />
              </div>
            ) : (
              <div>
                <FaChevronDown />
              </div>
            )}
          </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extend the line to the next item */}
      {!isLast && (
        <div className="absolute left-3 top-14 bottom-0 w-0.5 bg-gray-300" />
      )}
    </div>
  );
};

const TourItinerary = ({ DetailTour }) => {
  return (
    <div className="flex flex-wrap border-green-200 border rounded-lg bg-white p-4">
      <h1 className="text-2xl font-bold mb-4 w-full">Tour Itineraries</h1>
      {DetailTour.tour_itineraries.map((itinerary, index) => (
        <TourCard
          key={itinerary.id}
          itinerary={itinerary}
          index={index}
          isLast={index === DetailTour.tour_itineraries.length - 1}
        />
      ))}
    </div>
  );
};

export default TourItinerary;

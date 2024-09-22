import React, { useState } from "react";
import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import Egy from "../../../public/assets/egys.jpeg";

type Props = {};

const PackageDetails = (props: Props) => {
  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(null);

  const handleToggleFAQ = (index: number) => {
    setExpandedFAQIndex(expandedFAQIndex === index ? null : index);
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-segoe mb-4">The Basics</h2>
          <p className="text-gray-700 mb-6 font-segoe">
            Few structures on the planet are as immediately recognizable as the
            Giza Pyramids, and fewer still have served a similar purpose in
            stirring the imagination of travelers. Egypt’s history and culture
            have had an impact on the world for over 4,000 years, but none more
            so than the Great Pyramid of Giza. Built for Pharaoh Khufu, it’s the
            oldest of the Seven Wonders of the Ancient World and the only one
            still standing. With other major attractions such as the Sphinx, the
            Solar Boat Museum, the Pyramid of Djoser, and the Pyramid of Unas in
            Saqqara, this is an iconic sight not to be missed.
          </p>
          <button className="bg-yellow-500 text-white font-segoe px-4 py-2 rounded shadow hover:bg-yellow-600">
            View All Tours
          </button>
        </div>

        <div className="flex justify-center">
          <div className="sm:w-96 w-72 rounded-lg overflow-hidden shadow-md bg-white mx-auto my-5">
            <div className="relative h-48">
              <Image
                src={Egy}
                alt="Giza Pyramids"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
              <button
                onClick={handleFavoriteClick}
                className="absolute top-2 right-2 bg-transparent rounded-full p-1.5"
              >
                <FaStar
                  className={`w-5 h-5 ${
                    isFavorite ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-1 font-segoe">
                Cairo, Egypt
              </p>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 font-segoe">
                Half-day tour, sound &amp; light show, tour of the king
              </h3>
              <div className="flex items-center mb-2">
                <FaStar className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-semibold mr-1 font-segoe">4.5</span>
                <span className="text-sm text-gray-600 font-segoe">
                  (101 reviews)
                </span>
              </div>
              <div className="flex justify-end">
                <p className="text-sm text-gray-600">
                  From{" "}
                  <span className="text-lg font-semibold text-black font-segoe">
                    $320
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Things to know before you go
        </h2>
        <p className="text-gray-700">
          - Admission to the Great Pyramid of Giza requires a ticket separate
          from the general admission ticket to the Giza Plateau. It’s highly
          recommended to book in advance, as visitor numbers are limited each
          day. - Wear comfortable shoes, as there’s quite a bit of walking to
          do, especially if you want to explore inside the pyramids.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">How to get there</h3>
          <p className="text-gray-700">
            The Giza Plateau is about 12 miles from Cairo. Taxis and
            ride-hailing services such as Uber are readily available.
            Alternatively, many organized tours include transportation from
            Cairo hotels.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">When to get there</h3>
          <p className="text-gray-700">
            The cooler months between November and February offer the most
            comfortable weather for exploring the pyramids. Arriving early in
            the morning or late in the afternoon provides the best lighting for
            photography.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="border-t border-gray-200 pt-4">
              <h4
                className="flex justify-between items-center font-semibold cursor-pointer"
                onClick={() => handleToggleFAQ(idx)}
              >
                What are the nearest attractions to Giza Pyramids?
                {expandedFAQIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </h4>
              {expandedFAQIndex === idx && (
                <p className="text-gray-600 mt-2">
                  The Great Sphinx, the Solar Boat Museum, and the Pyramid of
                  Khafre are located nearby. Guided tours often include these
                  attractions.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

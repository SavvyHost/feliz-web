import React from "react";
import Link from "next/link";
import { BsLuggageFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";
import Image from "next/image";
import Advisor from "../../../../public/assets/advisor.png";
import Esas from "../../../../public/assets/esas.png";

const DesktopHeroOverlay: React.FC = () => {
  return (
    <div className="absolute bg-green-900 top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-7/12 w-11/12 rounded-lg shadow-lg">
      {/* Main content container */}
      <div className="px-3 py-5">
        {/* Title and description */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Welcome to Feliz Tour Egypt
          </h1>
          <p className="text-md sm:text-lg text-gray-200">
            We Are Ready For Services
          </p>
        </div>

        {/* Buttons section */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <Link href="/">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-2 px-7 rounded-md shadow-md transition-all hover:from-green-700 hover:to-green-800 flex items-center justify-center space-x-2 text-xl">
              <BsLuggageFill className="text-lg" />
              <span>Tour Packages</span>
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gradient-to-r from-green-800 to-green-600 text-white font-bold py-2 px-7 rounded-md shadow-md transition-all hover:from-green-500 hover:to-green-600 flex items-center justify-center space-x-2 text-xl">
              <FaBus className="text-lg" />
              <span>Excursions</span>
            </button>
          </Link>
        </div>

        {/* Logos section */}
        <div className="flex items-center justify-center space-x-6">
          <div className="w-20 sm:w-24">
            <Image
              src={Advisor}
              alt="TripAdvisor Logo"
              className="w-full h-auto"
            />
          </div>
          <div className="w-20 sm:w-24">
            <Image
              src={Esas}
              alt="Esmeralda Cruise Logo"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeroOverlay;

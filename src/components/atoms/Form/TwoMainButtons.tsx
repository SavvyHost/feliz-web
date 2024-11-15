import React from "react";
import Link from "next/link";
import { BsLuggageFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";
import Image from "next/image";
import Advisor from "../../../../public/assets/advisor.png";
import Esas from "../../../../public/assets/esas.png";

const DesktopHeroOverlay: React.FC = () => {
  return (
    <div className="absolute bg-gradient-to-br from-custom-turquoise/30 to-custom-lightblue/30 backdrop-blur-md top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-6/12 w-11/12 rounded-lg shadow-lg border border-custom-white/20">
      {/* Main content container */}
      <div className="px-3 py-5">
        {/* Title and description */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-custom-white mb-2 mt-3 text-shadow-shine">
            Welcome to Feliz Tour Egypt
          </h1>
          <p className="text-xl text-custom-white text-shadow-bright">
            We Are Ready For Service
          </p>
        </div>

        {/* Buttons section */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <Link href="/top-packages">
            <button className="bg-warm-gradient text-white font-bold py-2 px-7 rounded-md shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 text-xl">
              <BsLuggageFill className="text-lg" />
              <span>Tour Packages</span>
            </button>
          </Link>
          <Link href="/top-excursions">
            <button className="bg-blue-gradient text-custom-white font-bold py-2 px-7 rounded-md shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 text-xl">
              <FaBus className="text-lg" />
              <span>Excursions</span>
            </button>
          </Link>
        </div>

        {/* Logos section */}
        <div className="flex items-center justify-center space-x-6">
          <div className="w-20 sm:w-24 cursor-pointer transition-transform duration-300 hover:scale-110">
            <Image
              src={Advisor}
              alt="TripAdvisor Logo"
              className="w-full h-auto"
            />
          </div>
          {/* <div className="w-20 sm:w-24 transition-transform duration-300 hover:scale-110">
            <Image
              src={Esas}
              alt="Esmeralda Cruise Logo"
              className="w-full h-auto"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DesktopHeroOverlay;

import React, { useState, useEffect } from "react";
import Link from "next/link";


type Props = {};

const HeroOverlay: React.FC<Props> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 620) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust based on your mobile breakpoint
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="absolute inset-0 flex flex-col justify-center items-center mt-20  p-4">
        <h1 className="text-4xl sm:text-5xl capitalize text-white font-bold lg:text-6xl font-segoe text-center mb-4 lg:mb-6">
          Feliz Tour Egypt With The Best Locals Ever!
        </h1>
        <p className="text-lg sm:text-xl capitalize text-white font-bold font-segoe lg:text-2xl text-center mb-8 lg:mb-10">
          Confused? Want to Egypt Raisen your dream package? Enquire here in 1
          min
        </p>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0">
          <Link href="/inquire" passHref>
            <button className="bg-green-800 capitalize font-segoe text-white font-semibold py-3 px-8 lg:py-4 lg:px-10 rounded-md mb-4 sm:mb-0 sm:mr-4 shadow-lg transition-all duration-300 ease-in-out  hover:bg-white hover:border-gray-300 hover:text-black hover:shadow-xl transform hover:scale-105">
              Inquire Now
            </button>
          </Link>
          <span className="text-lg font-semibold mb-4 sm:mb-0 sm:mr-4 text-white">
            Or
          </span>
          <Link href="/top-packages" passHref>
            <button className="bg-green-900 capitalize font-segoe text-white font-semibold py-3 px-8 lg:py-4 lg:px-10 rounded-md shadow-lg transition-all duration-300 ease-in-out  hover:bg-white hover:border-gray-300 hover:text-black hover:shadow-xl transform hover:scale-105">
              Discover Travel Packages
            </button>
          </Link>
        </div>
      </div>

      {/* Fixed Buttons when Scrolling on Mobile */}
      {isScrolled && isMobile && (
        <div className="fixed top-16 bg-[#FAFAFA] left-0 w-full py-4 z-20">
          <div className="flex flex-row items-center justify-center space-x-2 px-4">
            <Link href="/inquire" className="w-full">
              <button className="w-full bg-green-500 hover:bg-gray-600 text-white font-normal text-nowrap py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                Inquire Now
              </button>
            </Link>
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-black text-xs font-medium">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Link href="/top-packages" className="w-full">
              <button className="w-full bg-green-900 hover:bg-gray-700 text-white font-normal text-nowrap py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                Discover Travel Packages
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroOverlay;

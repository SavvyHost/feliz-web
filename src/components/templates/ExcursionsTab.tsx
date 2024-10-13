import React, { useState } from "react";
import TravelPackagePage from "@/components/molecules/TravelCardSearch/TravelCardSearch";

import { useMediaQuery } from "@mui/material";
import LargeScreenSidebar from "../atoms/Filters/LargeScreenSidebar";
import { ToursData, TourPackage } from "@/types/tour";
import MobileSearchModal from "../atoms/Search/MobileSearchModal";
import MobileSidebar from "../atoms/Filters/MobileSidebar";
import SearchInput from "../atoms/Search/Search";

interface ExcursionsTabProps {
  toursData: ToursData; // Define props type to include toursData
}

const ExcursionsTab: React.FC<ExcursionsTabProps> = ({ toursData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [selectedDestination, setSelectedDestination] =
    useState<string>("Spain");
  const [selectedStarRating, setSelectedStarRating] =
    useState<string>("5 stars");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Restaurant",
  ]);
  const [selectedAccommodationType, setSelectedAccommodationType] =
    useState<string>("Hotel");

  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as [number, number]); // Ensure newValue is typed correctly
  };

  const handleClearFilters = () => {
    setPrice([0, 1000]);
    setSelectedDestination("");
    setSelectedStarRating("5 stars");
    setSelectedAmenities([]);
    setSelectedAccommodationType("");
  };

  const handleApplyFilters = () => {
    console.log("Filters Applied");
    // Implement the logic to apply filters
  };

  return (
    <div className="flex flex-col md:flex-row gap-8  ">
      {isLargeScreen ? (
        <div className="w-full md:w-1/4">
          <LargeScreenSidebar
            price={price}
            selectedDestination={selectedDestination}
            selectedStarRating={selectedStarRating}
            selectedAmenities={selectedAmenities}
            selectedAccommodationType={selectedAccommodationType}
            handlePriceChange={handlePriceChange}
            handleClearFilters={handleClearFilters}
            handleApplyFilters={handleApplyFilters}
            setSelectedDestination={setSelectedDestination}
            setSelectedStarRating={setSelectedStarRating}
            setSelectedAmenities={setSelectedAmenities}
            setSelectedAccommodationType={setSelectedAccommodationType}
          />
        </div>
      ) : (
        // <div className="fixed top-12 z-30 left-0 bg-white pb-6 pt-8 px-6 md:hidden flex justify-center ">
        //   <button
        //     onClick={() => setIsModalOpen(true)}
        //     className="bg-green-800 p-3 text-white mr-4 rounded-lg  w-full max-w-[130px]"
        //   >
        //     Show Filters
        //   </button>

        //   <MobileSearchModal />
        // </div>

        ""
      )}

      <div className="w-full md:w-3/4 mb-5 lg:mt-0  lg:mb-4 px-2">
        <TravelPackagePage toursData={toursData} />
      </div>

      <MobileSidebar
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        price={price}
        selectedDestination={selectedDestination}
        selectedStarRating={selectedStarRating}
        selectedAmenities={selectedAmenities}
        selectedAccommodationType={selectedAccommodationType}
        handlePriceChange={handlePriceChange}
        handleClearFilters={handleClearFilters}
        setSelectedDestination={setSelectedDestination}
        setSelectedStarRating={setSelectedStarRating}
        setSelectedAmenities={setSelectedAmenities}
        setSelectedAccommodationType={setSelectedAccommodationType}
      />
    </div>
  );
};

export default ExcursionsTab;

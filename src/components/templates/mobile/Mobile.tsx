import React, { useState } from "react";

import MobileSearchModal from "@/components/atoms/Search/MobileSearchModal";
import TravelPackagePage from "@/components/molecules/TravelCardSearch/TravelCardSearch";
import { ToursData } from "@/types/tour";
import MobileSidebar from "@/components/atoms/Filters/MobileSidebar";
import Explore from "@/components/molecules/ExploreTours";
import { Filter, SlidersHorizontal } from "lucide-react";

interface MobileProps {
  toursData: ToursData;
}

const Mobile: React.FC<MobileProps> = ({ toursData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State management for filters
  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [selectedDestination, setSelectedDestination] =
    useState<string>("Spain");
  const [selectedStarRating, setSelectedStarRating] = useState<string[]>([
    "5 stars",
  ]); // Changed to an array for multiple selections
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Restaurant",
  ]);
  const [selectedAccommodationType, setSelectedAccommodationType] = useState<
    string[]
  >(["Hotel"]); // Changed to an array for multiple selections

  // Handle price change
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrice(newValue as [number, number]);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setPrice([0, 1000]);
    setSelectedDestination("");
    setSelectedStarRating([]);
    setSelectedAmenities([]);
    setSelectedAccommodationType([]);
  };

  // Apply filters function
  const handleApplyFilters = () => {
    // Implement your filter application logic here
    console.log("Filters applied:", {
      price,
      selectedDestination,
      selectedStarRating,
      selectedAmenities,
      selectedAccommodationType,
    });
  };

  return (
    <div className="bg-[#FAFAFA]  flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-[#FAFAFA] p-2 z-10 ">
        <div className="mt-[70px] flex justify-center items-center gap-3 w-full">
          <div className="w-full">
            <MobileSearchModal />
          </div>
          <div className="">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#4CAF50] text-nowrap py-4 px-6 text-white rounded-md"
            >
              <SlidersHorizontal />
            </button>
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
              handleApplyFilters={handleApplyFilters} // Pass the function here
              setSelectedDestination={setSelectedDestination}
              setSelectedStarRating={setSelectedStarRating}
              setSelectedAmenities={setSelectedAmenities}
              setSelectedAccommodationType={setSelectedAccommodationType}
            />
          </div>
        </div>
      </div>
      <div className="mt-36">
        <Explore />
      </div>
      <div className="flex-1">
        <div className="px-3">
          <div className="flex flex-col md:flex-row gap-8 mt-32">
            <div className="w-full md:w-3/4">
              <TravelPackagePage toursData={toursData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;

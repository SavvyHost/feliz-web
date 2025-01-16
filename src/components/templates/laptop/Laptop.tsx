import React, { useState } from "react";
import LargeScreenSidebar from "@/components/atoms/Filters/LargeScreenSidebar";
import TravelPackagePage from "@/components/molecules/TravelCardSearch/TravelCardSearch";
import SearchInput from "@/components/atoms/Search/Search";
import { ToursData } from "@/types/tour";
import PaginationExample from "@/components/molecules/Pagination";
import Explore from "@/components/molecules/ExploreExcursios";
import Banner from "./Banner";

interface LaptopProps {
  toursData: ToursData;
}

const Laptop: React.FC<LaptopProps> = ({ toursData }) => {
  // State management for filters
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
    setSelectedStarRating("");
    setSelectedAmenities([]);
    setSelectedAccommodationType("");
  };

  // Apply filters
  const handleApplyFilters = () => {
    console.log("Filters applied:", {
      price,
      selectedDestination,
      selectedStarRating,
      selectedAmenities,
      selectedAccommodationType,
    });
  };

  // Calculate dynamic results count
  const filteredResultsCount = toursData.data.length; // Update this logic based on active filters

  return (
    <div className="mt-3">
      {/* Search Bar */}
      {/* <div className="mt-24">
        <SearchInput />
      </div>
      <div className="">
        <Explore />
      </div> */}

      <div className="mt-16">
        <Banner overlayText="Explore Amazing Tour Packages" />
      </div>

      {/* Main Content Layout: Filters on the left, Cards on the right */}
      <div className="flex flex-col md:flex-row gap-8 mt-8 px-20">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <LargeScreenSidebar
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
            handleApplyFilters={handleApplyFilters}
          />
        </div>

        {/* Travel Packages */}
        <div className="w-full md:w-3/4">
          {/* Dynamic Results Count */}
          <div className="mb-4 text-primary-dark text-lg font-semibold">
            {filteredResultsCount === 1 ? "Result" : "Results"} (
            {filteredResultsCount})
          </div>

          <TravelPackagePage toursData={toursData} />
        </div>
      </div>
    </div>
  );
};

export default Laptop;

import React, { useState } from "react";
import LargeScreenSidebar from "@/components/atoms/Filters/LargeScreenSidebar";
import TravelPackagePage from "@/components/molecules/TravelCardSearch/TravelCardSearch";
import { ToursData } from "@/types/tour";
import { useRouter } from "next/router";
import Banner from "./Banner";

interface LaptopProps {
  toursData: ToursData;
  categories: { name: string }[]; // Ensure categories prop is typed correctly
}

const Laptop: React.FC<LaptopProps> = ({
  toursData,
  categories,
  whatsnumber,
}) => {
  // State management for filters
  const categoryNames = categories.map((category) => category.name);
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

  // Default category is set to "All Categories"
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

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
    setSelectedCategory("All Categories"); // Reset category to default
  };

  // Apply filters
  const handleApplyFilters = () => {
    console.log("Filters applied:", {
      price,
      selectedDestination,
      selectedStarRating,
      selectedAmenities,
      selectedAccommodationType,
      selectedCategory,
    });
  };

  const router = useRouter();

  return (
    <div className="bg-[#FAFAFA]">
      <div className="mt-0">
        <Banner overlayText="Explore Amazing Tour Packages" />
      </div>
      {/* Main Content Layout: Filters on the left, Cards on the right */}
      <div className="flex flex-col md:flex-row gap-8 mt-8 lg:px-16 ">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <LargeScreenSidebar
            price={price}
            categories={[...categoryNames]} // Add "All Categories" at the top
            selectedCategory={selectedCategory} // Pass the selected category state
            selectedDestination={selectedDestination}
            selectedStarRating={selectedStarRating}
            selectedAmenities={selectedAmenities}
            selectedAccommodationType={selectedAccommodationType}
            handlePriceChange={handlePriceChange}
            handleClearFilters={handleClearFilters}
            setSelectedCategory={setSelectedCategory} // Pass the setSelectedCategory function
            setSelectedDestination={setSelectedDestination}
            setSelectedStarRating={setSelectedStarRating}
            setSelectedAmenities={setSelectedAmenities}
            setSelectedAccommodationType={setSelectedAccommodationType}
            handleApplyFilters={handleApplyFilters}
          />
        </div>

        {/* Travel Packages */}
        <div className="w-full md:w-3/4 mt-1">
          <TravelPackagePage toursData={toursData} whatsnumber={whatsnumber} />
        </div>
      </div>
    </div>
  );
};

export default Laptop;

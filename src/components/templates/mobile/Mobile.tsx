import React, { useState } from "react";

import MobileSearchModal from "@/components/atoms/Search/MobileSearchModal";
import TravelPackagePage from "@/components/molecules/TravelCardSearch/TravelCardSearch";
import { ToursData } from "@/types/tour";
import MobileSidebar from "@/components/atoms/Filters/MobileSidebar";
import Explore from "@/components/molecules/ExploreExcursios";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import fetchData from "@/helper/FetchData";

interface MobileProps {
  toursData: ToursData;
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  description: string | null;
  is_active: number;
  created_at: string;
  images: any[];
  panar_image: {
    id: number;
    url: string;
    name: string;
  };
}

const Mobile: React.FC<MobileProps> = ({ toursData, categories }) => {
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

  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
    console.log("Filters applied:", {
      price,
      selectedDestination,
      selectedStarRating,
      selectedAmenities,
      selectedAccommodationType,
    });
  };

  // Update the data based on selected category and filters
  const updateToursData = async () => {
    let endpoint = "tours?type=tour_package";
    if (selectedCategory) {
      endpoint += `&category=${selectedCategory}`;
    }
    // Add more filter logic here if needed

    const data: ToursData = await fetchData(endpoint);
    console.log(data);
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: categoryId },
    });
  };

  return (
    <div className="bg-[#FAFAFA] flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-[#FAFAFA] p-2 z-10">
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
      <div className="mt-36 px-3">
        <Explore
          categories={categories}
          setSelectedCategory={handleCategoryChange} // Pass the category change handler
          router={router} // Ensure the router is passed for category changes
        />
      </div>
      <div className="flex-1">
        <div className="px-3">
          <div className="flex flex-col md:flex-row gap-8 ">
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

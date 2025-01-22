import React from "react";
import { Radio, Checkbox, Slider, Button } from "@mui/material";
import FilterSection from "./FilterSection";

interface LargeScreenSidebarProps {
  price: [number, number];
  selectedCategory: string;
  selectedStarRating: string;
  selectedAmenities: string[];
  selectedAccommodationType: string;
  categories: string[];
  handlePriceChange: (event: Event, newValue: number | number[]) => void;
  handleClearFilters: () => void;
  handleApplyFilters: () => void;
  setSelectedCategory: (category: string) => void;
  setSelectedStarRating: (rating: string) => void;
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAccommodationType: (type: string) => void;
}

const LargeScreenSidebar: React.FC<LargeScreenSidebarProps> = ({
  price,
  selectedCategory,
  selectedStarRating,
  selectedAmenities,
  selectedAccommodationType,
  categories,
  handlePriceChange,
  handleClearFilters,
  handleApplyFilters,
  setSelectedCategory,
  setSelectedStarRating,
  setSelectedAmenities,
  setSelectedAccommodationType,
}) => {
  // Add "All Categories" at the top of the categories list
  const updatedCategories = ["All Categories", ...categories];

  return (
    <div className="mt-4">
      {/* Filters Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-segoe">Applied filters</h2>
        <Button
          className="text-red-600 hover:text-red-500 font-segoe"
          onClick={handleClearFilters}
        >
          Clear All
        </Button>
      </div>

      {/* Categories Filter */}
      <FilterSection title="Categories">
        <div className="space-y-2">
          {updatedCategories.map((category) => (
            <div
              key={category}
              className="flex items-center cursor-pointer hover:bg-blue-100"
              onClick={() => setSelectedCategory(category)}
            >
              <Radio
                checked={selectedCategory === category}
                sx={{
                  color: "blue",
                  "&.Mui-checked": {
                    color: "blue",
                  },
                }}
              />
              <span className="ml-2 font-segoe">{category}</span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price">
        <div className="px-4">
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{
              color: "blue",
              "& .MuiSlider-thumb": {
                backgroundColor: "blue",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "blue",
              },
            }}
          />
          <div className="flex justify-between mt-2 font-segoe">
            <span>${price[0]}</span>
            <span>${price[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Star Rating Filter */}
      <FilterSection title="Star rating">
        <div className="space-y-2">
          {["5 stars", "4 stars", "3 stars", "2 stars", "1 star"].map(
            (rating) => (
              <div
                key={rating}
                className="flex items-center cursor-pointer hover:bg-blue-100"
                onClick={() =>
                  setSelectedAmenities((prev) =>
                    prev.includes(rating)
                      ? prev.filter((item) => item !== rating)
                      : [...prev, rating]
                  )
                }
              >
                <Checkbox
                  checked={selectedAmenities.includes(rating)}
                  sx={{
                    color: "blue",
                    "&.Mui-checked": {
                      color: "blue",
                    },
                  }}
                />
                <span className="ml-2 font-segoe">{rating}</span>
              </div>
            )
          )}
        </div>
      </FilterSection>

      {/* Apply Filters Button */}
      <div className="mt-4">
        <Button
          className="bg-primary-light hover:bg-primary-dark text-white w-full"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default LargeScreenSidebar;

import React, { useState } from "react";
import Slider from "react-slick";
import ExcursionCard from "@/components/templates/ExcursionCard";
import { Category } from "@/types/tour";

interface ExploreProps {
  categories: Category[];
  setSelectedCategory: (categoryName: string) => void;
  router: any; // Add appropriate type for the router object if needed
}

const Explore: React.FC<ExploreProps> = ({
  categories,
  setSelectedCategory,
  router,
}) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    categories[0]?.name || ""
  );

  const handleCategorySelect = (name: string) => {
    setSelectedCategoryName(name);
    setSelectedCategory(name);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: name },
    });
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <h2 className="md:text-3xl text-xl font-segoe mb-6 text-start">
        Explore Excursions
      </h2>

      <div className="w-full relative">
        <div className="overflow-hidden">
          <Slider {...sliderSettings}>
            {categories.map((category) => (
              <div key={category.id} className="pr-2">
                <ExcursionCard
                  imageSrc={category.panar_image.url || "/fallback-image.jpg"} // Ensure imageSrc is a string
                  recommendation={category.name}
                  isSelected={selectedCategoryName === category.name}
                  onSelect={() => handleCategorySelect(category.name)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Explore;

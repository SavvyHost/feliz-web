// ExcursionList.tsx
import React from "react";
import Slider from "react-slick";
import ExcursionCard from "./ExcursionCard"; // Import the ExcursionCard component
import { sampleExcursions } from "@/data";

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        centerMode: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
  ],
};

const ExcursionList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-segoe mb-6">Egypt Excursions</h2>
      {/* Render slider only on mobile view */}
      <div className="block md:hidden">
        <Slider {...settings}>
          {sampleExcursions.map((excursion, index) => (
            <ExcursionCard key={index} {...excursion} />
          ))}
        </Slider>
      </div>
      {/* Render cards directly on larger screens */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleExcursions.map((excursion, index) => (
          <ExcursionCard key={index} {...excursion} />
        ))}
      </div>
    </div>
  );
};

export default ExcursionList;

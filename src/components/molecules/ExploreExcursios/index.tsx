import React from "react";
import Slider from "react-slick";
import ExcursionCard from "@/components/templates/ExcursionCard";
import { excursions } from "@/data";
import { StaticImageData } from "next/image";

// Define the type for the excursion data
type Excursion = {
  id: number;
  imageSrc: StaticImageData;
  recommendation: string;
};

// Carousel settings
const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 1024, // For desktop view, show multiple cards
      settings: {
        slidesToShow: 3, // Adjust the number of slides depending on how many should fill the width
        slidesToScroll: 1,
        arrows: true, // Enable arrows for desktop
        centerMode: false,
      },
    },
  ],
};

const Explore: React.FC = () => {
  return (
    <div className="">
      <h2 className="md:text-3xl text-xl font-segoe  mb-6 text-start">
        Explore Excursions
      </h2>

      {/* Carousel for both mobile and desktop */}
      <div className="block lg:w-1/2">
        <Slider {...sliderSettings}>
          {excursions.map((excursion) => (
            <div key={excursion.id} className="">
              {" "}
              {/* Add padding for card spacing */}
              <ExcursionCard
                imageSrc={excursion.imageSrc}
                recommendation={excursion.recommendation}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Explore;

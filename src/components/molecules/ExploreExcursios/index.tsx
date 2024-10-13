import React, { useState } from "react";
import Slider from "react-slick";
import ExcursionCard from "@/components/templates/ExcursionCard";
import { excursions } from "@/data";
import { StaticImageData } from "next/image";

type Excursion = {
  id: number;
  imageSrc: StaticImageData;
  recommendation: string;
};

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
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
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: false,
      },
    },
  ],
};

const Explore: React.FC = () => {
  // Set the default selected card to the first excursion's id
  const [selectedCardId, setSelectedCardId] = useState<number | null>(
    excursions[0]?.id || null
  );

  const handleCardSelect = (id: number) => {
    setSelectedCardId(id); // Only one card selected at a time
  };

  return (
    <div className="explore-container">
      <h2 className="md:text-3xl text-xl font-segoe mb-6 text-start">
        Explore Excursions
      </h2>

      <div className="block lg:w-full">
        <Slider {...sliderSettings}>
          {excursions.map((excursion) => (
            <div key={excursion.id} className="p-2">
              <ExcursionCard
                imageSrc={excursion.imageSrc}
                recommendation={excursion.recommendation}
                isSelected={selectedCardId === excursion.id}
                onSelect={() => handleCardSelect(excursion.id)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Explore;

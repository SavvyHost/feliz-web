import React from "react";
import Slider from "react-slick";
import AttractionCard from "@/components/templates/AttractionCard";
import { ToursData } from "@/types/tour";
import RelatedAttraction from "./RelatedAttraction";

interface ToursProps {
  toursData: ToursData;
}

const MainRelated: React.FC<ToursProps> = ({ toursData }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,

    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="tours-container">
      <Slider {...settings} className="tours-slider">
        {toursData.data.map(
          (attraction) =>
            attraction.is_best_deal === 1 && (
              <div key={attraction.id} className="tour-card-wrapper">
                <RelatedAttraction
                  id={attraction.id}
                  title={attraction.title}
                  location={attraction.location}
                  price={attraction.min_price}
                  image={attraction.main_image.url}
                  rating={2}
                  duration={attraction.duration}
                  ageRange={attraction.age_range}
                />
              </div>
            )
        )}
      </Slider>
    </div>
  );
};

export default MainRelated;

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";
import ImageCard from "../../../../public/assets/Secondimage.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sampleAttractions } from "@/data";

type Attraction = {
  id: number;
  name: string;
  imageSrc: StaticImageData;
  toursCount: number;
};

const AttractionCard: React.FC<Attraction> = ({
  name,
  imageSrc,
  toursCount,
}) => {
  return (
    <div className="flex items-center cursor-pointer rounded-lg overflow-hidden md:w-80 w-72 md:mx-0 ml-28 h-24 transition-transform duration-300 ease-in-out hover:border border-gray-200 hover:bg-white">
      <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="flex-grow p-4 flex flex-col justify-center">
        <h2 className="text-sm font-semibold text-gray-800 truncate font-segoe">
          {name}
        </h2>
        <p className="text-xs text-gray-600 truncate font-segoe">
          {toursCount} Tours and Activities
        </p>
      </div>
    </div>
  );
};

const Attractions: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    rows: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container w-full overflow-hidden p-0">
      {" "}
      {/* Adjust container width and overflow */}
      {isMobile ? (
        <Slider {...sliderSettings}>
          {sampleAttractions.map((attraction) => (
            <div className="flex justify-center" key={attraction.id}>
              <AttractionCard {...attraction} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-3">
          {sampleAttractions.map((attraction) => (
            <div className="flex justify-center" key={attraction.id}>
              <AttractionCard {...attraction} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attractions;

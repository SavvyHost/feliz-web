import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Attraction } from "@/types/tour";
import defaultImage from "../../../../public/assets/trail.jpeg";
import Link from "next/link";
type AttractionCardProps = {
  name: string;
  imageSrc: string; // Updated to string for dynamic image URLs
  toursCount: number;
};

const AttractionCard: React.FC<AttractionCardProps> = ({
  name,
  imageSrc,
  toursCount,
}) => {
  return (
    <Link
      href=""
      className="flex flex-col items-center cursor-pointer rounded-lg overflow-hidden transition-transform duration-300 ease-in-out border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl"
    >
      <div className="flex flex-col items-center cursor-pointer rounded-lg overflow-hidden  w-80 h-52 md:h-60 ">
        <div className="relative w-full h-2/3 overflow-hidden">
          <Image
            src={imageSrc || defaultImage}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <div className="w-full flex-grow p-4 flex flex-col justify-center items-center text-center">
          {/* Apply Tailwind truncate to limit text and add "..." */}
          <h2 className="lg:text-lg text-base font-normal lg:font-semibold text-gray-800 truncate w-full max-w-4/12 font-segoe">
            {name}
          </h2>
          <p className="text-sm text-gray-600 truncate font-segoe">
            {toursCount} Tours and Activities
          </p>
        </div>
      </div>
    </Link>
  );
};

type Props = {
  attractions: Attraction[]; // Accept dynamic data for attractions
};

const Attractions: React.FC<Props> = ({ attractions }) => {
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
    infinite: false,
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
      {isMobile ? (
        <Slider {...sliderSettings}>
          {attractions.map((attraction) => (
            <div className="flex justify-start pr-3 pb-2" key={attraction.id}>
              <AttractionCard
                name={attraction.name}
                imageSrc={attraction.paner_image?.url || defaultImage} // Use the dynamic image
                toursCount={attraction.toursCount || 0} // Assuming the API has toursCount or related field
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-3">
          {attractions.map((attraction) => (
            <div className="flex justify-start" key={attraction.id}>
              <AttractionCard
                name={attraction.name}
                imageSrc={attraction.paner_image?.url || defaultImage}
                toursCount={attraction.toursCount || 0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attractions;

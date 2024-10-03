import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { cardData } from "@/data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"; // Importing icons

const NextArrow = ({ onClick }) => (
  <div
    className="absolute -top-5 lg:block hidden right-4 transform -translate-y-1/2 cursor-pointer  rounded-full p-2"
    onClick={onClick}
  >
    <FiChevronRight size={24} /> {/* Right arrow icon */}
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -top-5 right-20 lg:block hidden transform -translate-y-1/2 cursor-pointer rounded-full p-2"
    onClick={onClick}
  >
    <FiChevronLeft size={24} /> {/* Left arrow icon */}
  </div>
);

export default function Adventures() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    arrows: false, // Disable default arrows
    draggable: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relative">
      {/* Custom Arrows */}
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
      <NextArrow onClick={() => sliderRef.current?.slickNext()} />

      <Slider ref={sliderRef} {...settings} className="flex justify-start">
        {cardData.map((card) => (
          <div key={card.id} className="flex justify-start ">
            <div className="flex flex-col  items-start hover:rounded-lg relative group">
              {/* Card Container */}
              <div className="flex pr-2 flex-col items-start group relative">
                <div className="relative bg-white shadow-md overflow-hidden transition-all duration-500 rounded-md group-hover:rounded-lg">
                  {/* Image Container */}
                  <div className="relative">
                    <Image
                      className="w-full h-[300px] object-cover transition-transform transform group-hover:scale-110 duration-500"
                      src={card.image}
                      alt={card.title}
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex flex-col font-segoe justify-center items-center text-center p-4 text-white bg-black bg-opacity-30 hover:bg-opacity-40 hover:transition-all transition-opacity duration-500 opacity-100 group-hover:opacity-100">
                      <h2 className="text-xl font-bold text-white text-shadow-custom">
                        {card.title}
                      </h2>
                      <div className="absolute bottom-4 rounded-lg w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-opacity-75 p-2">
                        <p className="text-sm">{card.hoverText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

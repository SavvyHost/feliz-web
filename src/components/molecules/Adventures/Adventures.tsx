import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";

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

interface AdventuresProps {
  categories: Category[];
}

const NextArrow = ({ onClick }) => (
  <div
    className="absolute -top-8 lg:block hidden right-4 transform -translate-y-1/2 cursor-pointer rounded-full p-2 bg-white shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out z-10"
    onClick={onClick}
  >
    <FiChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -top-8 right-20 lg:block hidden transform -translate-y-1/2 cursor-pointer rounded-full p-2 bg-white shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out z-10"
    onClick={onClick}
  >
    <FiChevronLeft size={24} />
  </div>
);

const Adventures: React.FC<AdventuresProps> = ({ categories }) => {
  const sliderRef = useRef<Slider>(null);
  const router = useRouter();
  const [clickStartX, setClickStartX] = useState<number | null>(null);
  const [clickStartY, setClickStartY] = useState<number | null>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    arrows: false,
    draggable: true,
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setClickStartX(e.clientX);
    setClickStartY(e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent, categoryId: number) => {
    if (clickStartX !== null && clickStartY !== null) {
      const deltaX = Math.abs(e.clientX - clickStartX);
      const deltaY = Math.abs(e.clientY - clickStartY);

      if (deltaX < 5 && deltaY < 5) {
        router.push(`top-excursions`);
      }
    }
    setClickStartX(null);
    setClickStartY(null);
  };

  return (
    <div className="relative overflow-hidden">
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
      <NextArrow onClick={() => sliderRef.current?.slickNext()} />

      <Slider ref={sliderRef} {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="px-2">
            <div
              onMouseDown={handleMouseDown}
              onMouseUp={(e) => handleMouseUp(e, category.id)}
              className="flex flex-col items-start group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full">
                <Image
                  className="w-full h-40 object-cover transition-transform transform group-hover:scale-110 duration-500"
                  src={category.panar_image.url}
                  alt={category.name}
                  width={320}
                  height={160}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
                  <h2 className="text-xl font-bold text-white text-shadow-custom">
                    {category.name}
                  </h2>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm">
                      {category.description || "Explore this category"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Adventures;

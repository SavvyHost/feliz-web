import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "@/components/templates/ProfileCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { VscArrowSmallLeft, VscArrowSmallRight } from "react-icons/vsc";

// Reviews data (same as before)
const reviews = [
  {
    name: "Sarah Nichols",
    username: "sarah_n",
    date: "2024-08-01",
    rating: 4,
    content:
      "Great experience! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "John Doe",
    username: "john_d",
    date: "2024-08-02",
    rating: 5,
    content:
      "Amazing service! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Jane Smith",
    username: "jane_s",
    date: "2024-08-03",
    rating: 3,
    content:
      "It was okay. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Michael Clark",
    username: "michael_c",
    date: "2024-08-05",
    rating: 5,
    content:
      "Absolutely wonderful! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Lisa Brown",
    username: "lisa_b",
    date: "2024-08-06",
    rating: 4,
    content:
      "Great product and service. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const ProfileCardsContainer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<any>(null); // Reference to the slider

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
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
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Custom next/prev handlers
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="relative w-full overflow-hidden cursor-pointer">
      {/* Custom Previous Arrow */}
      <div
        className="custom-prev-arrow  hidden bg-gray-800 p-3 rounded-full absolute left-32 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-700"
        onClick={handlePrev}
      >
        <VscArrowSmallLeft className="text-white text-xl" />
      </div>

      {/* Custom Next Arrow */}
      <div
        className="custom-next-arrow  hidden bg-gray-800 p-3 rounded-full absolute right-32 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-gray-700"
        onClick={handleNext}
      >
        <VscArrowSmallRight className="text-white text-lg" />
      </div>

      {/* Slick Slider */}
      <Slider ref={sliderRef} {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="w-full">
            <ProfileCard
              name={review.name}
              username={review.username}
              date={review.date}
              rating={review.rating}
              content={review.content}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProfileCardsContainer;

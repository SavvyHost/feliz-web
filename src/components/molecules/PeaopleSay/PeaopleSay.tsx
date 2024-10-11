import React from "react";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import TripLogo from "../../../../public/assets/trip-advisor-logo-png-1024x483.png";

interface Review {
  rating: number;
  title: string;
  content: string;
  timeAgo: string;
}

const reviews: Review[] = [
  {
    rating: 5,
    title: "They are nice knows their work readily...",
    content:
      "They are nice knows their work readily answers your questions with additional infos. Very accommodating...",
    timeAgo: "23 minutes ago",
  },
  {
    rating: 5,
    title: "Hop-on Hop-off in Montreal",
    content:
      "Frequency of the buses and the guides. We were told on day #1, there would be less frequent service...",
    timeAgo: "26 minutes ago",
  },
  {
    rating: 5,
    title: "This was a great tour",
    content:
      "This was a great tour, especially if you don't want to drive to Northern Ireland as there was a lot of traffic...",
    timeAgo: "27 minutes ago",
  },
  {
    rating: 5,
    title: "They are nice knows their work readily...",
    content:
      "They are nice knows their work readily answers your questions with additional infos. Very accommodating...",
    timeAgo: "23 minutes ago",
  },
  {
    rating: 5,
    title: "Hop-on Hop-off in Montreal",
    content:
      "Frequency of the buses and the guides. We were told on day #1, there would be less frequent service...",
    timeAgo: "26 minutes ago",
  },
  {
    rating: 5,
    title: "This was a great tour",
    content:
      "This was a great tour, especially if you don't want to drive to Northern Ireland as there was a lot of traffic...",
    timeAgo: "27 minutes ago",
  },
];

const TrustpilotReviewComponent: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,

    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
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
    <div className="flex flex-col md:flex-row ">
      {/* Trustpilot rating */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
        <div className="">
          <h2 className="text-xl font-bold mb-2">Excellent</h2>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="text-green-500 fill-current" size={24} />
            ))}
          </div>
          <p className="text-sm text-gray-600 mb-4">Based on 223,512 reviews</p>
          <div className="flex items-center justify-between">
            <Image
              src={TripLogo}
              alt="Trustpilot logo"
              width={120}
              height={30}
            />
            <p className="text-xs text-gray-500 ml-2">
              Viator does not perform checks on Trustpilot reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Review slider */}
      <div className="w-full md:w-3/4">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="px-2 cursor-pointer">
              <div className=" h-full">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < review.rating
                          ? "text-green-500 fill-current"
                          : "text-gray-300"
                      }`}
                      size={16}
                    />
                  ))}
                </div>
                <h3 className="font-semibold mb-2 text-lg">{review.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                <p className="text-xs text-gray-500">{review.timeAgo}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrustpilotReviewComponent;

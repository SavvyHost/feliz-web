import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../Loader";

// Import a default image
import defaultImage from "../../../../public/assets/Secondimage.jpeg"; // Update the path accordingly

// Define the type for the DestinationCard props
interface DestinationCardProps {
  name: string;
  imageUrl: string; // Use string for URL
}

// DestinationCard component with typed props
const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  imageUrl,
}) => (
  <div className="relative rounded-lg overflow-hidden group md:w-[23.6%] w-[310px] h-52 md:mx-2 my-2">
    <Image
      src={imageUrl || defaultImage} // Use default image if imageUrl is empty
      alt={name}
      width={256}
      height={160}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
      <h3 className="text-white text-xl font-semibold text-shadow-custom">
        {name}
      </h3>
    </div>
  </div>
);

// Adjust the prop type to accept an array directly
interface DestinationRowProps {
  Destinations: {
    name: string;
    panar_image: string; // Use string for URL
  }[];
}

// DestinationRow component
const DestinationRow: React.FC<DestinationRowProps> = ({ Destinations }) => {
  // Check if Destinations array is empty or undefined
  if (!Destinations || Destinations.length === 0) {
    return <Loader />; // Display Loader if no data is available
  }

  // Carousel settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          centerMode: true, // Center the single item on mobile
          centerPadding: "0px", // Adjust padding for centered card
        },
      },
    ],
  };

  return (
    <div className="p-0">
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Slider {...settings}>
          {Destinations.map((dest, index) => (
            <DestinationCard
              key={`${dest.name}-${index}`}
              name={dest.name}
              imageUrl={dest.panar_image}
            />
          ))}
        </Slider>
      </div>
      {/* Desktop Grid */}
      <div className="hidden md:flex flex-wrap justify-start p-1">
        {Destinations.map((dest, index) => (
          <DestinationCard
            key={`${dest.name}-${index}`}
            name={dest.name}
            imageUrl={dest.panar_image}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationRow;

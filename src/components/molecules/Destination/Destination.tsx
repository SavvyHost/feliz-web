import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import a default image
import defaultImage from "../../../../public/assets/bgblogs.png"; // Update the path accordingly
import Link from "next/link";

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
  <Link href="attraction">
    <div className="relative rounded-lg overflow-hidden group w-full lg:w-11/12 h-52  my-2 hover:shadow-xl">
      <Image
        src={imageUrl || defaultImage} // Use default image if imageUrl is empty
        alt={name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-4">
        <h3 className="text-white text-xl font-semibold text-shadow-custom">
          {name}
        </h3>
      </div>
    </div>
  </Link>
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
  // Carousel settings
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
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
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="">
      <Slider {...settings}>
        {Destinations.map((dest, index) => (
          <div key={`${dest.name}-${index}`} className="pr-3 cursor-pointer">
            <DestinationCard name={dest.name} imageUrl={dest.panar_image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DestinationRow;

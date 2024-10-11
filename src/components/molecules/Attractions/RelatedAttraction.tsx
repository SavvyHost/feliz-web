import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsHeart } from "react-icons/bs"; // Add heart icon for favorite
import { MdLocationOn } from "react-icons/md"; // Add location icon
import defaultImage from "../../../../public/assets/camels.jpeg";

interface AttractionCardProps {
  id: number;
  title: string;
  location?: string;
  price: number;
  image: StaticImageData;
  rating: number;
  duration: string;
  ageRange: string;
}

const RelatedAttraction: React.FC<AttractionCardProps> = ({
  id,
  title,
  location,
  price,
  image,
  rating,
  duration,
  ageRange,
}) => {
  return (
    <Link href={`/distanation`}>
      <div className="group flex transition-all bg-white border border-gray-300 hover:border-green-400 shadow-sm hover:shadow-xl ease-in-out flex-col cursor-pointer overflow-hidden bg-transparent md:max-w-xs max-w-sm sm:mx-2 mx-3 my-2 sm:my-4 lg:my-6">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || defaultImage}
            alt={title}
            layout="fill"
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-125"
          />
          {/* Badge Section */}
          <div className="absolute top-2 left-2 flex space-x-2">
            <span className="bg-green-800 text-white text-xs px-2 py-1 rounded-none font-semibold">
              Featured
            </span>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-none font-semibold">
              6% OFF
            </span>
          </div>
          {/* Favorite Icon */}
          <div className="absolute top-2 right-2">
            <BsHeart className="text-white text-xl" />
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4">
          <h3
            className="font-bold text-lg text-gray-800 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
            }}
          >
            {title}
          </h3>
          {/* Price Section */}
          <div className="flex items-center text-gray-600 text-sm ">
            <span className="line-through mr-2 font-bold text-lg ">
              {" "}
              From ${price + 150}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm ">
            <span className="font-bold text-lg text-green-900">
              {" "}
              From ${price}
            </span>
          </div>{" "}
          {/* Duration and Age Range */}
          <div className="flex items-center text-gray-950 text-sm">
            <span>{duration} Days</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedAttraction;

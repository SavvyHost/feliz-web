import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import DefaultImage from "../../../../public/assets/pyr.jpeg";

interface CardProps {
  imageSrc: string | StaticImageData;
  title: string;
  content: string;
  created_at: string; // Added created_at as a prop
  id: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  content,
  created_at,
  id,
}) => {
  // Fallback to default image if imageSrc is undefined, null, or an empty string
  const imageToUse = imageSrc && imageSrc !== "" ? imageSrc : DefaultImage;

  return (
    <Link href={`/blogs/${id}`} aria-label={`View blog post "${title}"`}>
      <div className="bg-white flex-shrink-0 mb-6 mx-2 flex flex-col lg:h-full h-[360px] bg-none hover:shadow-xl hover:bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
        {/* Image Section */}
        <div className="relative h-48 md:h-60">
          {" "}
          {/* Adjusted height for mobile */}
          <Image
            src={imageToUse}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Handle image loading errors
              console.error("Error loading img:", e);
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 pb-0">
          {" "}
          {/* Adjusted padding for mobile */}
          {/* Created At Section */}
          <span className="text-xs md:text-sm block text-gray-400 mb-1">
            {created_at}
          </span>{" "}
          {/* Adjusted font size */}
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-gray-800">
            {title}
          </h3>{" "}
          {/* Adjusted font size */}
          <hr className="my-2" />
          {/* Content Preview */}
          <p
            className="text-gray-700 font-light text-sm md:text-base line-clamp-3 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;

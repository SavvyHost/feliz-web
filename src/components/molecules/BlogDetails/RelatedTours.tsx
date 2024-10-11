import React from "react";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "../../../../public/assets/pyr.jpeg"; // Replace with your own image path

interface CardProps {
  imageSrc: string;
  title: string;
  date: string;
  link: string;
}

const HorizontalCard: React.FC<CardProps> = ({
  imageSrc,
  title,
  date,
  link,
}) => {
  return (
    <div className="flex items-center rounded-none cursor-pointer shadow-lg bg-white max-w-lg overflow-hidden">
      {/* Image Section */}
      <div className="w-1/3 h-[135px]">
        <Image
          src={imageSrc || DefaultImage}
          alt={title}
          width={160}
          height={200}
          objectFit="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 w-2/3">
        {/* Date */}
        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Read More Link */}
        <Link href={link} className="text-purple-600 font-semibold">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default HorizontalCard;

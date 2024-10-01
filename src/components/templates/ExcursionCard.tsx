import Image, { StaticImageData } from "next/image";
import React from "react";

type ExcursionCardProps = {
  imageSrc: StaticImageData;
  recommendation: string;
};

const ExcursionCard: React.FC<ExcursionCardProps> = ({
  imageSrc,
  recommendation,
}) => (
  <div
    className="rounded-lg ml-3 cursor-pointer overflow-hidden shadow-md border border-transparent hover:border-green-500 transition-border duration-300 ease-in-out"
    style={{ width: "90%" }} // Reduce card width
  >
    <div className="relative w-full" style={{ height: "100px" }}>
      {" "}
      {/* Set a fixed height */}
      <Image
        src={imageSrc}
        alt="Excursion"
        layout="fill" // This will make the image fill the parent div
        objectFit="cover" // Ensures the image covers the container without distortion
        className="transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </div>
    <p className="p-2 text-xs md:text-sm font-medium">{recommendation}</p>{" "}
    {/* Adjust padding and font size */}
  </div>
);

export default ExcursionCard;

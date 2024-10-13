import Image, { StaticImageData } from "next/image";
import React from "react";

type ExcursionCardProps = {
  imageSrc: StaticImageData;
  recommendation: string;
  isSelected: boolean;
  onSelect: () => void;
};

const ExcursionCard: React.FC<ExcursionCardProps> = ({
  imageSrc,
  recommendation,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`rounded-md cursor-pointer overflow-hidden transition-all duration-300 ease-in-out ${
        isSelected ? "translate-y-[-10px]" : ""
      }`}
      style={{ width: "100%" }}
    >
      <div className="relative w-full" style={{ height: "150px" }}>
        <Image
          src={imageSrc}
          alt="Excursion"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        />
        {!isSelected && (
          <div className="absolute inset-0 bg-blue-200 bg-opacity-30"></div>
        )}
      </div>
      <p className="p-2 text-left text-xs md:text-sm font-bold">
        {recommendation}
      </p>

      <div
        className={`h-2 rounded-xl bg-green-500 mx-auto transition-all duration-500 ease-in-out ${
          isSelected ? "w-[98%]" : "w-0"
        }`}
      />
    </div>
  );
};

export default ExcursionCard;

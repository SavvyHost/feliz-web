import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

type ExcursionCardProps = {
  recommendation: string;
};

const TournCard: React.FC<ExcursionCardProps> = ({ recommendation }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectChange = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`rounded-lg ml-3 cursor-pointer  overflow-hidden hover:shadow-md border border-blue-500 transition-border duration-300 ease-in-out ${
        isSelected ? "bg-blue-800 text-white" : ""
      }`}
      style={{ width: "90%" }} // Reduce card width
      onClick={handleSelectChange} // Toggle selection on click
    >
      <div className="flex items-center p-2">
        <p className="text-xs md:text-sm font-medium text-center">
          {recommendation}
        </p>
      </div>
    </div>
  );
};

export default TournCard;

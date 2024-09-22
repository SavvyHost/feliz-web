import React from "react";
import Image, { StaticImageData } from "next/image";

interface ExpertGuidesCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const ExpertGuidesCard: React.FC<ExpertGuidesCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="max-w-sm lg:mx-auto mx-2  relative border-1 mb-3 border-black pt-4">
      <div className="absolute top-0 left-4">
        <Image src={image} alt="" />
      </div>
      <div className="bg-white rounded-lg p-4 pt-8 border border-gray-200">
        <h3 className="text-lg font-segoe text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 text-nowrap">{description}</p>
      </div>
    </div>
  );
};

export default ExpertGuidesCard;

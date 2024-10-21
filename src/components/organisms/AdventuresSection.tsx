import React from "react";
import Adventures from "../molecules/Adventures/Adventures";

interface Category {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  description: string | null;
  is_active: number;
  created_at: string;
  images: any[];
  panar_image: {
    id: number;
    url: string;
    name: string;
  };
}

interface AdventuresSectionProps {
  categories: Category[];
}

const AdventuresSection: React.FC<AdventuresSectionProps> = ({
  categories,
}) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer lg:my-8 my-4">
        Adventures For Everyone
      </div>
      <div className="">
        <Adventures categories={categories} />
      </div>
    </div>
  );
};

export default AdventuresSection;

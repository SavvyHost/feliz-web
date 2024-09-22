import React from "react";
import Excursions from "../molecules/Excursions/Excursions";
import { TourPackage } from "@/types/tour"; // Import TourPackage type

interface ExcursionsSectionProps {
  toursData: TourPackage[]; // Define the type for toursData
}

const ExcursionsSection: React.FC<ExcursionsSectionProps> = ({ toursData }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer md:p-10 p-5">
        Top Excursions
      </div>
      <div>
        <Excursions toursData={toursData} />{" "}
        {/* Pass toursData to Excursions */}
      </div>
    </div>
  );
};

export default ExcursionsSection;

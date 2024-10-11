import React from "react";

import { ToursData } from "@/types/tour";
import MainRelated from "./MainRelated";

interface Props {
  toursData: ToursData; // Define the correct type here
}

const AttractionPageSection: React.FC<Props> = ({ toursData }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left lg:px-16 p-2 mb-4 text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer">
        Latest Attractions
      </div>
      <MainRelated toursData={toursData} />
    </div>
  );
};

export default AttractionPageSection;

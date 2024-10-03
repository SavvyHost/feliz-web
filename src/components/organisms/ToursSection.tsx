import React from "react";
import Tours from "../molecules/Tours/Tours";
import { ToursData } from "@/types/tour";

interface Props {
  toursData: ToursData; // Define the correct type here
}

const ToursSection: React.FC<Props> = ({ toursData }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left mb-4 text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer">
        Latest Tours packages
      </div>
      <Tours toursData={toursData} />
    </div>
  );
};

export default ToursSection;

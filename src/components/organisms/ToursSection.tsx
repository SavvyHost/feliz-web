import React from "react";
import Tours from "../molecules/Tours/Tours";
import { ToursData } from "@/types/tour";

interface Props {
  toursData: ToursData; // Define the correct type here
}

const ToursSection: React.FC<Props> = ({ toursData }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer md:p-10 p-5">
        Latest Tours packages
      </div>
      <Tours toursData={toursData} />
    </div>
  );
};

export default ToursSection;

import React from "react";
import Attractions from "../molecules/Attractions/Attractions";
import { Attraction } from "@/types/attraction"; // Import Attraction type

type Props = {
  attractions: Attraction[]; // New: Pass attractions data as props
};

const AttractionsSection: React.FC<Props> = ({ attractions }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
        Attractions in Egypt
      </div>
      <div>
        <Attractions attractions={attractions} />{" "}
      </div>
    </div>
  );
};

export default AttractionsSection;

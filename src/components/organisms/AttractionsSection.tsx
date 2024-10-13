import React from "react";
import Attractions from "../molecules/Attractions/Attractions";
import { Attraction } from "@/types/tour"; // Import Attraction type

type Props = {
  attractions: Attraction[]; // New: Pass attractions data as props
};

const AttractionsSection: React.FC<Props> = ({ attractions }) => {
  return (
    <div className="">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer lg:my-8 my-4">
        Top Attractions
      </div>
      <div>
        <Attractions attractions={attractions} />{" "}
      </div>
    </div>
  );
};

export default AttractionsSection;

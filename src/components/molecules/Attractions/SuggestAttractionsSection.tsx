import React from "react";

import { Attraction } from "@/types/tour"; // Import Attraction type
import SuggestAttraction from "./SuggestAttractions";

type Props = {
  attractions: Attraction[]; // New: Pass attractions data as props
};

const SuggestAttractionsSetion: React.FC<Props> = ({ attractions }) => {
  return (
    <div className="">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
        Attractions in Egypt
      </div>
      <div>
        <SuggestAttraction attractions={attractions} />{" "}
      </div>
    </div>
  );
};

export default SuggestAttractionsSetion;

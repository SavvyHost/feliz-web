import React from "react";
import Attractions from "../molecules/Attractions/Attractions";

type Props = {};

const AttractionsSection = (props: Props) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer md:p-10 p-5">
        Attractions in Egypt
      </div>
      <div>
        <Attractions />
      </div>
    </div>
  );
};

export default AttractionsSection;

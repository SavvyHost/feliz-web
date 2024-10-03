import React from "react";
import Adventures from "../molecules/Adventures/Adventures";

type Props = {};

const AdventuresSection = (props: Props) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
        Adventures For Everyone
      </div>
      <div className="">
        <Adventures />
      </div>
    </div>
  );
};

export default AdventuresSection;

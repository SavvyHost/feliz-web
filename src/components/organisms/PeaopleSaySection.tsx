import React from "react";
import PeopleSay from "../molecules/PeaopleSay/PeaopleSay";

type Props = {};

const PeopleSaySection = (props: Props) => {
  return (
    <div className="bg-white ">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer lg:my-8 my-4">
        What People Say
      </div>
      <div>
        <PeopleSay />
      </div>
    </div>
  );
};

export default PeopleSaySection;

import React from "react";
import PeopleSay from "../molecules/PeaopleSay/PeaopleSay";

type Props = {};

const PeopleSaySection = (props: Props) => {
  return (
    <div className="bg-white pb-5 ">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer md:p-10 p-5">
        What People Say
      </div>
      <div>
        <PeopleSay />
      </div>
    </div>
  );
};

export default PeopleSaySection;

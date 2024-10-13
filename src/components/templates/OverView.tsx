// components/templates/OverView.tsx
import React from "react";
import Drops from "@/components/atoms/drops";
import Excursions from "../molecules/Excursions/Excursions";
import { TourPackage } from "@/types/tour";
import Explore from "../molecules/ExploreExcursios";
import SearchExcursions from "../atoms/SearchExcursions/SearchExcursios";

interface OverViewProps {
  toursData: TourPackage[];
}

const OverView: React.FC<OverViewProps> = ({ toursData }) => {
  console.log(toursData);
  return (
    <div className="p-4">
      {/* <div className="">
        <SearchExcursions />
      </div> */}
      <div className="">
        <Explore />
      </div>
      <div className="lg:my-6 my-0">
        <Drops />
      </div>
      <div>
        <h2 className="md:text-3xl text-xl font-segoe mb-4 text-start">
          Tours and Tickets to Experience Giza Pyramids
        </h2>
        <div className="">
          <Excursions toursData={toursData} />
        </div>
      </div>
    </div>
  );
};

export default OverView;

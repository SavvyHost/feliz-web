// components/templates/OverView.tsx
import React from "react";
import Drops from "@/components/atoms/drops";
import Excursions from "../molecules/Excursions/Excursions";
import { TourPackage } from "@/types/tour";

interface OverViewProps {
  toursData: TourPackage[];
}

const OverView: React.FC<OverViewProps> = ({ toursData }) => {
  console.log(toursData);
  return (
    <div>
      <h2 className="text-3xl font-segoe text-start mt-2 ml-6">
        What’s Included
      </h2>
      <div className="mb-3">
        <Drops />
      </div>
      <Excursions toursData={toursData} />
    </div>
  );
};

export default OverView;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:p-0 p-2">
          {toursData.map((tour) => (
            <Excursions
              key={tour.id}
              id={tour.id}
              title={tour.title}
              location={tour.location}
              price={tour.min_price}
              image={tour.main_image.url}
              rating={2}
              destination={tour.destination}
              duration={tour.duration}
              ageRange={tour.age_range}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverView;

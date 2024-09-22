import React from "react";
import { MdDone } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { TourDetail, TourIncludeItem } from "@/types/tour";

interface IncludedProps {
  DetailTour: TourDetail;
}

const Included: React.FC<IncludedProps> = ({ DetailTour }) => {
  // Separate included and not-included items into two arrays
  const includedItems = DetailTour.tour_includes?.filter(
    (item: TourIncludeItem) => item.status === "yes"
  );
  const notIncludedItems = DetailTour.tour_includes?.filter(
    (item: TourIncludeItem) => item.status !== "yes"
  );

  return (
    <div>
      <h2 className="text-3xl font-segoe text-start mt-9">What’s Included</h2>

      {/* Flex container for two columns */}
      <div className="flex flex-col md:flex-row gap-10 mt-4">
        {/* Column for Included Items (with MdDone icon) */}
        <div className="w-full md:w-1/2">
          <h3 className="font-segoe text-green-700 text-2xl mb-4">Included</h3>
          {includedItems?.map((item: TourIncludeItem, index: number) => (
            <div key={index} className="flex items-center p-2">
              <div>
                <MdDone className="text-green-700 mr-4 " size={20} />
              </div>
              <div>
                <span className="font-segoe text-[#A16207] text-xl">
                  {item.title}
                </span>
                <span className="ml-2 text-gray-700 font-segoe text-xl">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Column for Not Included Items (with VscError icon) */}
        <div className="w-full md:w-1/2">
          <h3 className="font-segoe text-red-500 text-2xl mb-4">
            Not Included
          </h3>
          {notIncludedItems?.map((item: TourIncludeItem, index: number) => (
            <div key={index} className="flex items-center p-2">
              <div>
                <VscError className="text-red-500 mr-4" size={20} />
              </div>
              <div>
                <span className="font-segoe text-[#A16207] text-xl">
                  {item.title}
                </span>
                <span className="ml-2 text-gray-700 font-segoe text-xl">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Included;

import React from "react";
import { FaUser } from "react-icons/fa";

// Define the type for a price plan
type PricePlan = {
  title: string;
  price: string;
};

type PricePlanDetail = {
  title: string;
  from_month: string;
  to_month: string;
  prices: PricePlan[];
};

interface DetailTour {
  tour_prices: PricePlanDetail[];
}

// Define the PricePlanCard component
const PricePlanCard: React.FC<{
  title: string;
  period: string;
  plans: PricePlan[];
}> = ({ title, period, plans }) => {
  return (
    <div className="w-full bg-white rounded-lg p-4">
      <h2 className="text-xl font-segoe my-4 text-center">{title}</h2>
      <p className="m-4 font-segoe">{period}</p>
      <div className="flex flex-col space-y-4">
        {plans?.map((p, i) => (
          <div
            key={i}
            className="bg-[#FFF9F9] p-3 md:p-4 rounded-lg flex flex-col md:flex-row justify-around items-center text-center space-y-2 md:space-y-0"
          >
            <FaUser className="text-xl md:text-2xl text-yellow-800" />
            <p className="text-base md:text-lg font-segoe">{p.title}</p>
            <p className="font-semibold">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define the PricePlans component
const PricePlans: React.FC<{
  DetailTour: { tour_prices: PricePlanDetail[] };
}> = ({ DetailTour }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-segoe text-start mt-6 md:mt-9 mb-4 md:mb-6">
        Prices & Accommodation
      </h2>
      <div className="flex flex-col space-y-8">
        {DetailTour.tour_prices.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
          >
            <PricePlanCard
              title={`${plan.title} - Option ${index + 1}`}
              period={`${plan.from_month} - ${plan.to_month}`}
              plans={plan.prices}
            />
          </div>
        ))}
      </div>
      <h2 className="text-2xl md:text-3xl font-segoe text-start mt-6 md:mt-9 mb-4 md:mb-6">
        Travelers Photos
      </h2>
    </div>
  );
};

export default PricePlans;

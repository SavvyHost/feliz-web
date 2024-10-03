import React from "react";
import ImageGallery from "@/components/organisms/ImageGallery";
import TripInfo from "@/components/templates/Trip";
import Included from "@/components/templates/Included";
import TourItinerary from "@/components/templates/Itinerary";
import FAQ from "@/components/templates/Freq";
import Reviews from "@/components/templates/Reviews";
import RandomButtons from "@/components/templates/RandomButtons";
import UserProfilePage from "@/components/templates/Travelers";
import PricePlans from "@/components/templates/PriceSection";
import { TourDetail } from "@/types/tour"; // Correct import for TourDetail
import Prices from "@/components/templates/PriceSection";
import TourCard from "@/components/templates/Itinerary";
import DefaultDetails from "../organisms/DefaultDetails";
import TripExcusrions from "./TripExcursion";

interface MyPageProps {
  DetailTour: TourDetail;
}

const MyPage: React.FC<MyPageProps> = ({ DetailTour }) => {
  return (
    <div>
      <div className="p-4 lg:p-0">
        <TripExcusrions DetailTour={DetailTour} />
      </div>
      <hr />
      <div className="p-4 lg:p-0">
        <Included DetailTour={{ tour_includes: DetailTour.tour_includes }} />
        <hr />
        <TourCard
          DetailTour={{ tour_itineraries: DetailTour.tour_itineraries }}
        />
        <hr />
        <Prices DetailTour={{ tour_prices: DetailTour.tour_prices }} />
        <hr />
        {/* <UserProfilePage /> */}
        <FAQ
          DetailTour={{
            tour_frequently_questions: DetailTour.tour_frequently_questions,
          }}
        />
        <hr />
        <DefaultDetails />
        {/* <Reviews /> */}
        <RandomButtons DetailTour={{ tags: DetailTour.tags }} />
      </div>
    </div>
  );
};

export default MyPage;

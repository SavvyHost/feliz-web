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
import TravelDateOptions from "./PriceTour";
import PriceTour from "./PriceTour";
import DefaultDetails from "../organisms/DefaultDetails";

interface MyPageProps {
  DetailTour: TourDetail;
}

const MyPageTours: React.FC<MyPageProps> = ({ DetailTour }) => {
  return (
    <div>
      <ImageGallery DetailTour={DetailTour} />
      <div className="p-4 lg:p-0">
        <TripInfo DetailTour={DetailTour} />
      </div>
      <hr />
      <div className="p-4 lg:p-0">
        <Included DetailTour={DetailTour} />
        <hr />
        <TourItinerary
          DetailTour={{ tour_itineraries: DetailTour.tour_itineraries }}
        />
        <hr />
        <PriceTour DetailTour={{ tour_prices: DetailTour.tour_prices }} />
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

export default MyPageTours;

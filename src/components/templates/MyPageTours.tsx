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

interface MyPageProps {
  DetailTour: TourDetail;
}

const MyPageTours: React.FC<MyPageProps> = ({ DetailTour }) => {
  return (
    <div>
      <ImageGallery
        title={DetailTour.title}
        breadcrumb={["Home", "Tours", DetailTour.title]}
        mainContent={DetailTour.description}
        images={DetailTour.images}
      />
      <div className="p-4 lg:p-0">
        <TripInfo DetailTour={DetailTour} />
      </div>
      <hr />
      <div className="p-4 lg:p-0">
        <Included DetailTour={DetailTour} />
        <hr />
        {/* <TourItinerary DetailTour={DetailTour} /> */}
        <hr />
        <TravelDateOptions
          DetailTour={{ tour_prices: DetailTour.tour_prices }}
        />
        <hr />
        {/* <UserProfilePage /> */}
        <FAQ DetailTour={DetailTour} />
        <hr />
        {/* <Reviews /> */}
        <RandomButtons DetailTour={{ tags: DetailTour.tags }} />
      </div>
    </div>
  );
};

export default MyPageTours;

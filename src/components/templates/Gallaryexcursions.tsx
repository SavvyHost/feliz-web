import React from "react";
import ImageGallery from "@/components/organisms/ImageGallery";

import { TourDetail } from "@/types/tour"; // Correct import for TourDetail

interface MyPageProps {
  DetailTour: TourDetail;
}

const GallaryExcusrions: React.FC<MyPageProps> = ({ DetailTour }) => {
  return (
    <div>
      <ImageGallery DetailTour={DetailTour} />
    </div>
  );
};

export default GallaryExcusrions;

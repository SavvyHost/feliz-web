import React from "react";
import ImageGallery from "@/components/organisms/ImageGallery";

import { TourDetail } from "@/types/tour"; // Correct import for TourDetail

interface MyPageProps {
  DetailTour: TourDetail;
}

const GallaryExcusrions: React.FC<MyPageProps> = ({ DetailTour }) => {
  return (
    <div>
      <ImageGallery
        title={DetailTour.title}
        breadcrumb={["Home", "Tours", DetailTour.title]}
        mainContent={DetailTour.description}
        images={DetailTour.images}
      />
    </div>
  );
};

export default GallaryExcusrions;

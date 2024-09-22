import React from "react";
import MyPage from "@/components/templates/MyPage";
import BookingFormModal from "@/components/atoms/BookForm/BookingFormModal";
import BookingFormDesktop from "@/components/atoms/BookForm/BookingFormDesktop";
import fetchData from "@/helper/FetchData";
import { GetServerSidePropsContext } from "next";
import { TourDetail } from "@/types/tour"; 

interface ImageGalleryProps {
  DetailTour: TourDetail; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ DetailTour }) => {

  return (
    <div className="flex flex-col md:flex-row bg-[#FAFAFA] p-4 md:px-16">
      <div className="w-full md:w-1/3 p-2 pt-20 md:pt-28 order-1 md:order-2">
        <BookingFormModal />
        <BookingFormDesktop DetailTour={DetailTour} />
      </div>

      <div className="w-full md:w-2/3 md:mt-0 mt-3 p-2 md:pl-12 md:pt-28 order-2 md:order-1">
        <MyPage DetailTour={DetailTour} />
      </div>
    </div>
  );
};

export default ImageGallery;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };
  const DetailTour = await fetchData(`tours/${id}`);

  return {
    props: {
      DetailTour: DetailTour.data, 
    },
  };
}

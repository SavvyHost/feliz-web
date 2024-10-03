import React from "react";
import MyPage from "@/components/templates/MyPage";
import BookingFormModal from "@/components/atoms/BookForm/BookingFormModal";
import BookingFormDesktop from "@/components/atoms/BookForm/BookingFormDesktop";
import fetchData from "@/helper/FetchData";
import { GetServerSidePropsContext } from "next";
import { TourDetail } from "@/types/tour";
import MyPageTours from "@/components/templates/MyPageTours";

interface ImageGalleryProps {
  DetailTour: TourDetail;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ DetailTour }) => {
  console.log("🚀 ~ DetailTour:", DetailTour);
  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#FAFAFA] md:pt-5 md:px-16">
        <div className="w-full md:w-1/3 p-2 lg:px-0 pt-20 md:pt-20 order-1 md:order-2">
          <BookingFormModal DetailTour={DetailTour} />
          <BookingFormDesktop DetailTour={DetailTour} />
        </div>

        <div className="w-full md:w-2/3 mt-3 mr-3 md:mt-24 order-2 md:order-1">
          <MyPageTours DetailTour={DetailTour} />
        </div>
      </div>

      {/* Third Div for Centered Text, placed after the flex container */}
      {/* <div className="w-full text-center p-4 lg:p-0 bg-[#FAFAFA]">
        <DetailsSection DetailTour={DetailTour} />
      </div> */}
    </>
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

import React, { useState, useEffect } from "react";
import MyPageTours from "@/components/templates/MyPageTours";
import BookingFormModal from "@/components/atoms/BookForm/BookingFormModal";
import BookingFormDesktop from "@/components/atoms/BookForm/BookingFormDesktop";
import fetchData from "@/helper/FetchData";
import { GetServerSidePropsContext } from "next";
import { TourDetail } from "@/types/tour";
import { useWishlist } from "@/contexts/wishlist-context";
import { Heart } from "lucide-react";

interface ImageGalleryProps {
  DetailTour: TourDetail;
}

const TourDetails: React.FC<ImageGalleryProps> = ({ DetailTour }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showFixed, setShowFixed] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollThreshold = 300;
      setShowFixed(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWishlistClick = (e: React.MouseEvent, tour: TourDetail) => {
    e.preventDefault();
    toggleWishlist(tour);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:pt-5 md:px-16">
        <div className="w-full md:w-1/3 p-2 lg:px-0 pt-20 md:pt-28 order-1 md:order-2">
          <BookingFormModal DetailTour={DetailTour} />
          <BookingFormDesktop DetailTour={DetailTour} />
        </div>

        <div className="w-full md:w-2/3 mt-10 mr-3 md:mt-24 order-2 md:order-1">
          <MyPageTours DetailTour={DetailTour} />
        </div>
      </div>

      {/* Render only on client-side after mounting */}
      {isMounted && (
        <>
          <div className="hidden lg:block h-20" />
          <div
            className={`hidden lg:flex z-[999] fixed bottom-0 w-full bg-white shadow-md py-4 px-8 items-center justify-center gap-6 border-t border-gray-200 transition-all duration-300 ${
              showFixed
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <button
              onClick={scrollToTop}
              className="text-lg text-blue-600 hover:text-blue-700 transition duration-200 underline ml-4"
            >
              Book Now
            </button>

            <div className="text-xl font-normal">
              Price Start From
              <span className="text-2xl ml-3 underline font-semibold text-blue-600 min-w-[80px] text-center">
                {DetailTour.min_price} $
              </span>{" "}
              Per Person
            </div>

            <button
              onClick={(e) => handleWishlistClick(e, DetailTour)}
              className={`p-3 rounded-md shadow-md border transition-all duration-200 ${
                isInWishlist(DetailTour.id)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-blue-700 border-blue-700 hover:bg-gray-200"
              }`}
            >
              <Heart
                className={
                  isInWishlist(DetailTour.id) ? "text-white" : "text-blue-700"
                }
              />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default TourDetails;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };
  const DetailTour = await fetchData(`tours/${id}`);
  return {
    props: {
      DetailTour: DetailTour.data,
    },
  };
}

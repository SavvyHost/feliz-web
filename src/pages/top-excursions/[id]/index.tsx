import React, { useEffect, useState } from "react";
import MyPage from "@/components/templates/MyPage";
import fetchData from "@/helper/FetchData";
import { GetServerSidePropsContext } from "next";
import { TourDetail } from "@/types/tour";
import GallaryExcursions from "@/components/templates/Gallaryexcursions";
import BookingFormDesktop from "@/components/templates/ExcursionsForm/BookingFormDesktop";
import DefaultDetails from "@/components/organisms/DefaultDetails";
import ImageGallery from "@/components/organisms/ImageGallery";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";

interface ImageGalleryProps {
  DetailTour: TourDetail;
}

const ExcursionDetails: React.FC<ImageGalleryProps> = ({ DetailTour }) => {
  const [showButton, setShowButton] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    // Determine if the device is mobile based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Run on component mount and when window resizes
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: isMobile ? 300 : 80, // Scroll to 300px if mobile, 0px if desktop
      behavior: "smooth",
    });

    // Optionally, you can add a timeout to wait for the scroll effect to finish before opening the date picker
    setTimeout(() => {
      setOpenDatePicker(!openDatePicker);
    }, 0);
  };

  const handleWishlistClick = (e, tour) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tour);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:pt-5 md:px-16">
        <div className="w-full md:w-1/3 p-4 lg:px-0 pt-4 md:pt-[180px] order-2">
          <BookingFormDesktop
            DetailTour={DetailTour}
            openDatePicker={openDatePicker}
          />
        </div>
        <div className="w-full md:w-2/3 mt-8 md:mt-24 p-0 order-1">
          <ImageGallery DetailTour={DetailTour} />
        </div>
      </div>
      <div className="lg:w-2/3 w-full  lg:px-16 overflow-hidden">
        <MyPage DetailTour={DetailTour} />
      </div>

      {/* Fixed Bottom Bar */}
      <div
        className={`fixed border-t-2 z-50 bottom-0 left-0 right-0 bg-white shadow-md transition-all duration-700 ease-in-out ${
          showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            <div className="text-xl font-normal lg:block hidden">
              Price Start From
              <span className="text-2xl ml-3 underline font-semibold text-green-600 min-w-[80px] text-center">
                {DetailTour.min_price} $
              </span>{" "}
              Per Person
            </div>

            <button
              onClick={scrollToTop}
              className="w-full max-w-md bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition duration-200 text-center"
            >
              Book Now
            </button>

            <button
              onClick={(e) => handleWishlistClick(e, DetailTour)}
              className={`p-3 rounded-md shadow-md border transition-all duration-200 ${
                isInWishlist(DetailTour.id)
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-100 text-green-700 border-green-700 hover:bg-gray-200"
              }`}
            >
              <Heart
                className={
                  isInWishlist(DetailTour.id) ? "text-white" : "text-green-700"
                }
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExcursionDetails;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };
  const DetailTour = await fetchData(`tours/${id}`);
  return {
    props: {
      DetailTour: DetailTour.data,
    },
  };
}

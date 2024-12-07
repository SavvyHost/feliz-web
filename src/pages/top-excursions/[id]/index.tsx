import React, { useEffect, useState } from "react";
import MyPage from "@/components/templates/MyPage";
import { GetServerSidePropsContext } from "next";
import { TourDetail } from "@/types/tour";
import BookingFormDesktop from "@/components/templates/ExcursionsForm/BookingFormDesktop";
import ImageGallery from "@/components/organisms/ImageGallery";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import Thanks from "@/components/molecules/Thanks";
import fetchData from "@/helper/FetchData";

interface ImageGalleryProps {
  DetailTour: TourDetail;
}

const ExcursionDetails: React.FC<ImageGalleryProps> = ({ DetailTour }) => {
  const [showButton, setShowButton] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isThanksVisible, setIsThanksVisible] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [bookingState, setBookingState] = useState<any>(null);

  const [openDatePickerMobile, setOpenDatePickerMobile] = useState(false);
  const [openDatePickerDesktop, setOpenDatePickerDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNowClick = () => {
    if (bookingState?.handleBookNowClick) {
      if (!bookingState.selectedDate || !bookingState.hasSetPassengers) {
        scrollToTop();
      } else {
        bookingState.handleBookNowClick();
      }
    } else {
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: isMobile ? 300 : 80,
      behavior: "smooth",
    });

    // Set the correct date picker state based on the device
    if (isMobile) {
      setOpenDatePickerMobile(true); // Enable date picker for mobile view
    } else {
      setOpenDatePickerDesktop(true); // Enable date picker for desktop view
    }
  };

  const getButtonText = () => {
    if (!bookingState?.selectedDate || !bookingState?.hasSetPassengers) {
      return "Check Price"; // Show "Check Price" if date or passengers are not set
    }
    return "Book Now"; // Show "Book Now" if all conditions are met
  };

  return (
    <div className="relative">
      {/* Main content container */}
      <div className="flex flex-col md:flex-row md:pt-5 md:px-16">
        {/* Main content column that takes full width on mobile */}
        <div className="w-full md:w-2/3 mt-20 md:mt-24 p-0">
          <div className="mb-6">
            <ImageGallery DetailTour={DetailTour} />
          </div>

          {/* Booking form for mobile - shown between gallery and content */}
          <div className="md:hidden w-full px-4 ">
            <BookingFormDesktop
              DetailTour={DetailTour}
              openDatePicker={openDatePickerMobile}
              onStateChange={setBookingState}
            />
          </div>

          <div className="mt-0 overflow-hidden">
            <MyPage DetailTour={DetailTour} />
          </div>
        </div>

        {/* Desktop booking form - hidden on mobile */}
        <div className="hidden md:block w-full md:w-1/3 p-4 lg:px-0 pt-4 md:pt-[180px]">
          <BookingFormDesktop
            DetailTour={DetailTour}
            openDatePicker={openDatePickerDesktop}
            onStateChange={setBookingState}
          />
        </div>
      </div>

      {/* Floating bottom bar */}
      <div
        className={`fixed z-40 bottom-0 left-0 right-0 bg-white shadow-md transition-all duration-700 ease-in-out ${
          showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-6 -translate-y-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            <div className="text-xl font-normal lg:block hidden">
              Price Start From
              <span className="text-2xl ml-3 underline font-semibold text-blue-600 min-w-[80px] text-center">
                {DetailTour.min_price} $
              </span>{" "}
              Per Person
            </div>

            <button
              onClick={handleBookNowClick}
              className="w-full max-w-md bg-blue-600 text-white py-3 px-6 rounded-md shadow hover:bg-blue-700 transition duration-200 text-center"
            >
              {getButtonText()}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(DetailTour);
              }}
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
        </div>
      </div>

      {isThanksVisible && (
        <Thanks
          onClose={() => setIsThanksVisible(false)}
          message="Thank you for your submission!"
        />
      )}
    </div>
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

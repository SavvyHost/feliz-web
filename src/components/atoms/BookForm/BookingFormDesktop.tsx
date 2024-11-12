import React, { useState, useEffect } from "react";
import Thanks from "@/components/molecules/Thanks";
import "react-phone-number-input/style.css";
import MainDataBookingForm from "./MainDataBookingForm";
import { useWishlist } from "@/contexts/wishlist-context";

type BookingFormDesktopProps = {
  DetailTour: {
    id: number;
    min_price: number;
    // Add other necessary properties here
  };
};

export default function BookingFormDesktop({
  DetailTour,
}: BookingFormDesktopProps) {
  const [isThanksVisible, setIsThanksVisible] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleCloseThanks = () => {
    setIsThanksVisible(false);
  };

  const handleWishlistClick = (
    e: React.MouseEvent,
    tour: typeof DetailTour
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tour);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 300;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`hidden md:block p-2 ${isSticky ? "sticky -top-[64px]" : ""}`}
    >
      <h2 className="text-sm text-gray-500 mb-2">
        From ${DetailTour?.min_price}
      </h2>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        US ${DetailTour?.min_price} / Per person
      </h1>

      <div className="relative">
        <MainDataBookingForm
          DetailTour={DetailTour}
          setIsThanksVisible={setIsThanksVisible}
        />

        <button
          onClick={(e) => handleWishlistClick(e, DetailTour)}
          className={`absolute -top-14 right-3 p-2 rounded-none border border-green-700 transition-colors duration-200 ${
            isInWishlist(DetailTour.id)
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-white text-green-600 hover:bg-gray-100"
          }`}
        >
          {isInWishlist(DetailTour.id) ? "In Wishlist" : "Add to Wishlist"}
        </button>

        {isThanksVisible && (
          <Thanks
            onClose={handleCloseThanks}
            message="Thank you for your submission!"
          />
        )}
      </div>
    </div>
  );
}

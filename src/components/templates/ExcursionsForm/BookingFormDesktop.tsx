import React, { useState } from "react";
import MainDataBookingForm from "./MainDataBookingForm";
import { useWishlist } from "@/contexts/wishlist-context";
import { Heart } from "lucide-react";
import ShareButton from "@/components/atoms/ShareButton";

interface BookingFormDesktopProps {
  DetailTour: any;
  openDatePicker: boolean;
  onStateChange?: (state: any) => void;
}

const BookingFormDesktop: React.FC<BookingFormDesktopProps> = ({
  DetailTour,
  openDatePicker,
  onStateChange,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleWishlistClick = (e: React.MouseEvent, tour: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tour);
  };

  return (
    <div className="relative">
      {/* Share and Wishlist Buttons */}
      <div className="absolute lg:top-[-50px] top-[-5px] right-4 flex lg:gap-2 gap-0 z-10">
        <ShareButton
          url={typeof window !== "undefined" ? window.location.href : ""}
        />

        <button
          onClick={(e) => handleWishlistClick(e, DetailTour)}
          className={`lg:flex hidden  items-center gap-2 px-2 py-1  
      transition duration-200
      ${isInWishlist(DetailTour.id) ? "text-black " : " text-black"}
    `}
        >
          {/* Heart icon */}
          <Heart
            className={`text-base ${
              isInWishlist(DetailTour.id)
                ? "fill-red-500 text-red-500"
                : "text-black"
            }`}
          />
          <span className="text-base underline">
            {isInWishlist(DetailTour.id)
              ? "Added to Wishlist"
              : "Add to Wishlist"}
          </span>
        </button>
      </div>

      {/* Booking Form */}
      <div className="lg:p-4 p-1 bg-white rounded-lg lg:border border-none lg:shadow-md shadow-none space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md font-medium text-gray-600 mb-1">
              From ${DetailTour?.min_price}
            </h2>
            <h1 className="text-2xl font-bold text-gray-800">
              US ${DetailTour?.min_price} / Per person
            </h1>
          </div>
        </div>

        <MainDataBookingForm
          DetailTour={DetailTour}
          isDatePickerOpen={openDatePicker}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  );
};

export default BookingFormDesktop;

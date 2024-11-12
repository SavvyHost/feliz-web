import Thanks from "@/components/molecules/Thanks";
import { useState } from "react";
import "react-phone-number-input/style.css";
import MainDataBookingForm from "./MainDataBookingForm";
import DefaultDetails from "@/components/organisms/DefaultDetails";
import { useWishlist } from "@/contexts/wishlist-context";
import { Heart } from "lucide-react";

interface BookingFormDesktopProps {
  DetailTour: any;
  openDatePicker: boolean; // Define the openDatePicker prop
}

const BookingFormDesktop: React.FC<BookingFormDesktopProps> = ({
  DetailTour,
  openDatePicker,
}) => {
  const [isThanksVisible, setIsThanksVisible] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleCloseThanks = () => {
    setIsThanksVisible(false);
  };

  const handleWishlistClick = (e, tour) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tour);
  };

  return (
    <div className="lg:p-4 p-2 bg-white rounded-lg border shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <div className="">
          <h2 className="text-md font-medium text-gray-600 mb-1">
            From ${DetailTour?.min_price}
          </h2>
          <h1 className="text-2xl font-bold text-gray-800">
            US ${DetailTour?.min_price} / Per person
          </h1>
        </div>

        <button
          onClick={(e) => handleWishlistClick(e, DetailTour)}
          className={`p-2 rounded-md font-semibold border transition-all duration-200 ${
            isInWishlist(DetailTour.id)
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-100 text-green-700 border-green-700 hover:bg-gray-200"
          }`}
        >
          {isInWishlist(DetailTour.id) ? (
            <Heart />
          ) : (
            <Heart className="text-green-700" />
          )}
        </button>
      </div>

      <MainDataBookingForm
        isDatePickerOpen={openDatePicker} // Pass openDatePicker prop here
        DetailTour={DetailTour}
        setIsThanksVisible={setIsThanksVisible}
      />

      {isThanksVisible && (
        <Thanks
          onClose={handleCloseThanks}
          message="Thank you for your submission!"
        />
      )}
    </div>
  );
};

export default BookingFormDesktop;

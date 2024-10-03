import Thanks from "@/components/molecules/Thanks";
import { useState } from "react";
import "react-phone-number-input/style.css";
import MainDataBookingForm from "./MainDataBookingForm";
import DefaultDetails from "@/components/organisms/DefaultDetails";

export default function BookingFormDesktop({ DetailTour }) {
  const [isThanksVisible, setIsThanksVisible] = useState<boolean>(false);
  const handleCloseThanks = () => {
    setIsThanksVisible(false);
  };

  return (
    <div className="block p-6 bg-white rounded-lg border shadow-md">
      <h2 className="text-sm text-gray-500 mb-2">
        From ${DetailTour?.min_price}
      </h2>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        US ${DetailTour?.min_price} / Per person
      </h1>

      <MainDataBookingForm
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
}

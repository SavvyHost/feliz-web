import Thanks from "@/components/molecules/Thanks";
import { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import MainDataBookingForm from "./MainDataBookingForm";

export default function BookingFormDesktop({ DetailTour }) {
  const [isThanksVisible, setIsThanksVisible] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const handleCloseThanks = () => {
    setIsThanksVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this value as needed
      const scrollThreshold = 300;

      if (window.scrollY > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`hidden md:block ${isSticky ? "sticky -top-[64px]" : ""}`}>
      <h2 className="text-sm text-gray-500 mb-2">
        From ${DetailTour?.min_price}
      </h2>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        US ${DetailTour?.min_price} / Per person
      </h1>

      <div className="">
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
    </div>
  );
}

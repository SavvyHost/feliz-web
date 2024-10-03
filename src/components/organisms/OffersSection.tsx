import React from "react";
import Offer from "../molecules/Offer/Offer";
import Photo1 from "../../../public/assets/firstImage.jpeg";
import Photo2 from "../../../public/assets/phar.jpg";
type Props = {};

const OffersSection = (props: Props) => {
  return (
    <div className="">
      <div className="text-left mb-4 text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer">
        Special Offers
      </div>
      <div className="pb-2 lg:pb-10 ">
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-3/6 md:p-2 py-1 px-0 md:mb-0 mb-2">
            <Offer
              imageSrc={Photo1}
              title="Professional Cookware:"
              description="Stainless Steel | HexClad"
              originalPrice="From $100"
              discount="30% OFF"
              price="$71"
              expirationDate="20 December"
              linkHref="#"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-3/6 md:p-2 py-1 px-0">
            <Offer
              imageSrc={Photo2}
              title="Professional Cookware:"
              description="Stainless Steel | HexClad"
              originalPrice="From $100"
              discount="30% OFF"
              price="$71"
              expirationDate="20 December"
              linkHref="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;

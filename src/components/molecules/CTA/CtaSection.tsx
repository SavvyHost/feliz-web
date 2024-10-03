import Image from "next/image";
import React from "react";
import CTA from "../../../../public/assets/5-TOP-10-amazing-places-to-visit-in-Egypt-jintravel.com 1.png";
import Link from "next/link";

type Props = {};

const CtaSection = (props: Props) => {
  return (
    <div className=" font-segoe">
      <div className="w-full mx-auto grid md:grid-cols-2 gap-6 items-start">
        {/* Image Section */}
        <div className="md:order-2 order-1 text-left">
          <Image
            src={CTA}
            alt="Amazing places to visit in Egypt"
            className="w-full h-72"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* Text Section */}
        <div className="md:order-1 order-2 text-left">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
            Spread your wings with Egypt Raisen Tours!
          </h2>
          <h5 className="text-2xl font-normal mb-4 lg:text-3xl text-gray-950">
            Book travel services from around the world. Anytime. Anywhere.
          </h5>
          <p className="text-lg lg:text-xl text-black">
            Technology and travel agents' expertise come together to create a
            supercharged product that increases your revenue and efficiency.
            Check availability in real-time, book services, and receive booking
            confirmations immediately.
          </p>
          <Link
            href=""
            className="lg:mt-8 mt-6 mb-3 bg-green-800 hover:bg-opacity-80 text-white py-3 px-6 rounded-lg text-lg lg:text-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;

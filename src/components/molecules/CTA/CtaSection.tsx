import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const CtaSection = (props: Props) => {
  return (
    <div className="text-center max-w-3xl max-md:max-w-md mx-auto">
      <p className="text-sm font-bold text-green-600 mb-4">
        <span className="rotate-90 inline-block mr-2">|</span> ALL IN ONE IN
        FELIZ TOURS
      </p>
      <h2 className="text-gray-800 md:text-5xl text-3xl font-extrabold md:!leading-[55px]">
        Call To Action Section, Elevate Your Experience
      </h2>
      <div className="mt-8">
        <p className="text-base text-gray-500 leading-relaxed">
          Upgrade to our premium tour package and unlock a world of
          unforgettable experiences. Enjoy exclusive destinations, enhanced
          itineraries, and a seamless travel journey that brings your adventure
          to life.
        </p>
      </div>
      <div className="bg-white mt-12 flex px-1 py-1.5 rounded-full shadow-[0_5px_22px_-8px_rgba(93,96,127,0.2)] md:w-4/5 mx-auto overflow-hidden">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full outline-none bg-white pl-4 text-gray-800 text-sm"
        />
        <Link
          href="/inquire"
          className="bg-green-600 hover:bg-green-700 transition-all text-white text-sm rounded-full px-4 py-2.5"
        >
          Subscribe
        </Link>
      </div>
    </div>
  );
};

export default CtaSection;

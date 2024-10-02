import React from "react";
import { Star, Heart } from "lucide-react";
import CardTour from "../../../public/assets/Secondimage.jpeg";
import Image from "next/image";
const TourCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border my-3 rounded-lg">
      <div className="relative">
        <Image src={CardTour} alt="Food tour" className="w-full" />
        <div className="absolute top-2 right-2">
          <Heart className="text-white" />
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">GUIDED TOUR</div>
        <p className="text-gray-700 text-base mb-2">
          No Diet Club - Best food Tour in East London
        </p>
        <p className="text-gray-600 text-sm">3.5 hours • Small group</p>
        <div className="flex items-center mt-2">
          <Star className="text-yellow-400" />
          <Star className="text-yellow-400" />
          <Star className="text-yellow-400" />
          <Star className="text-yellow-400" />
          <Star className="text-yellow-400" />
          <span className="ml-1 text-gray-600 text-sm">4.9 (32)</span>
        </div>
        <p className="text-gray-800 font-semibold mt-2">
          From Rp 1,106,549 per person
        </p>
      </div>
    </div>
  );
};

export default TourCard;

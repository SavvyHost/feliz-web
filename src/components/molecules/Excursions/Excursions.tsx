import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Clock, Heart, Luggage, MapPin } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface ExcursionCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  image: StaticImageData;
  rating: number;
  duration: number;
  ageRange: string;
  destination: string;
}

const ExcursionCard: React.FC<ExcursionCardProps> = ({
  id,
  title,
  location,
  price,
  destination,
  image,
  rating,
  duration,
  ageRange,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <Link
      href={`/top-excursions/${id}`}
      className="block group transition-transform"
    >
      <div className=" rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-600 text-white">
              Top Rated
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist({
                id,
                title,
                location,
                price,
                image,
                rating,
                duration,
                destination,
                ageRange,
              });
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 shadow-md"
            aria-label={
              isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isInWishlist(id) ? (
              <FaHeart className="text-red-500 w-5 h-5" />
            ) : (
              <FaRegHeart className="text-gray-600 w-5 h-5" />
            )}
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{destination}</span>
          </div>

          <h2 className="font-medium text-base sm:text-lg mb-3 line-clamp-2 group-hover:underline group-hover:text-green-600 transition-colors">
            {title}
          </h2>

          <div className="space-y-3 flex-col justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{duration} Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Luggage className="h-4 w-4" />
              <span>Age: {ageRange}</span>
            </div>
          </div>

          <div>
            <div className="text-sm">
              <span className="line-through text-gray-500">
                From ${price + 20}
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-medium text-green-600">
                From ${price}
              </span>
              <span className="text-sm text-gray-600">/ Person</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExcursionCard;

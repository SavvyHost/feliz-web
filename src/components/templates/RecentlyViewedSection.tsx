import React from "react";
import { useRecentlyViewed } from "@/contexts/recently-viewed-context";
import Image from "next/image";
import Link from "next/link";
import { Clock, Luggage, MapPin, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";

const RecentlyViewedSection = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (recentlyViewed.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <h2 className="text-lg font-semibold">No Recently Viewed Items</h2>
        <p className="mt-2">
          Start exploring our packages and excursions to see them here!
        </p>
      </div>
    );
  }

  const handleWishlistClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item);
  };

  return (
    <div className="py-10">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer lg:my-8 my-4">
        Recently Viewed
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((item) => (
          <Link
            key={item.id}
            href={`/${
              item.type === "tour_package" ? "top-packages" : "top-excursions"
            }/${item.id}`}
            className="block group h-full"
          >
            <div className="flex flex-col h-full rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => handleWishlistClick(e, item)}
                    className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                    aria-label={
                      isInWishlist(item.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isInWishlist(item.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image || item.main_image?.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.isFeatured && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-600 text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 p-4">
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">
                    {item.location || item.destination}
                  </span>
                </div>

                <h2 className="font-medium text-base sm:text-lg mb-3 line-clamp-2 group-hover:underline group-hover:text-blue-600">
                  {item.title}
                </h2>

                <div className="space-y-3 flex-col justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>
                      {item.duration}{" "}
                      {item.type === "tour_package" ? "Days" : "Hours"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Luggage className="h-4 w-4" />
                    <span>Age: {item.ageRange || item.age_range}</span>
                  </div>
                  {item.run && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>Run: {item.run}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  {item.isOnSale && (
                    <div className="text-sm">
                      <span className="line-through text-gray-500">
                        From ${(item.price || item.min_price) + 20}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-medium text-blue-600">
                      From ${item.price || item.min_price}
                    </span>
                    <span className="text-sm text-gray-600">/ Person</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedSection;

import React, { useState } from "react";
import { Calendar, Globe, Heart, MapPin, Users } from "lucide-react";
import defaultImage from "../../../../public/assets/Secondimage.jpeg";
import Link from "next/link";
import { Button } from "@mui/material";
import Pagination from "../Pagination";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa";
import { useWishlist } from "@/contexts/wishlist-context";

interface Tour {
  id: number;
  title: string;
  destination: string;
  duration: number;
  age_range: string;
  run: string;
  min_price: number;
  main_image: {
    url: string;
  } | null;
}

interface ToursData {
  data: Tour[];
}

interface TravelPackagePageProps {
  toursData: ToursData;
}

const TravelPackagePage: React.FC<TravelPackagePageProps> = ({ toursData }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const toursPerPage = 6;
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const indexOfLastTour = (currentPage + 1) * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = toursData.data.slice(indexOfFirstTour, indexOfLastTour);
  const pageCount = Math.ceil(toursData.data.length / toursPerPage);

  const handleWishlistClick = (e: React.MouseEvent, tour: Tour) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tour);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 mt-3 lg:mt-0">
        {currentTours.map((pkg) => (
          <Link href={`/top-packages/${pkg.id}`} key={pkg.id}>
            <div className="w-full hover:border-green-500 group bg-white border-gray-300 border overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 p-3 h-64 md:h-auto relative  overflow-hidden">
                  <Image
                    src={pkg?.main_image?.url || defaultImage}
                    alt={pkg.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-none transition-transform duration-700 group-hover:scale-110" // Add the scaling effect here
                  />
                  <div className="absolute top-5 left-5 bg-green-500 text-white px-3 py-1 text-sm font-segoe rounded-sm shadow-md">
                    Special Offer 20%
                  </div>

                  <button
                    onClick={(e) => handleWishlistClick(e, pkg)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md bg-white/80 hover:bg-white transition-colors duration-200`}
                    aria-label={
                      isInWishlist(pkg.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {isInWishlist(pkg.id) ? (
                      <FaHeart className="text-red-500 w-6 h-6" />
                    ) : (
                      <FaRegHeart className="text-gray-600 w-6 h-6" />
                    )}
                  </button>
                </div>
                <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 className="lg:text-2xl text-xl font-bold text-gray-800">
                          {pkg.title}
                        </h2>

                        {/* <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {pkg.reviews_count || 0} reviews
                          </span>
                        </div> */}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">From</p>
                        <p className="text-3xl font-bold text-green-600">
                          ${pkg.min_price}
                        </p>
                        <p className="text-center text-xs text-nowrap text-gray-600">
                          Free Cancelation
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {pkg.duration} hours
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {pkg.destination}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {pkg.age_range}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">{pkg.run}</span>
                      </div>
                    </div>
                    <div
                      className="text-gray-700 line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: pkg.description,
                      }}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button className="bg-black text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-gray-800">
                      View Details
                    </Button>
                    <Button className="bg-green-500 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-600 flex items-center">
                      <FaWhatsapp className="mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default TravelPackagePage;

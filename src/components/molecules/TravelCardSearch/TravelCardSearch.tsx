import React, { useState } from "react";
import { Calendar, Globe, Heart, MapPin, Users } from "lucide-react";
import defaultImage from "../../../../public/assets/Secondimage.jpeg"; // Import your default image
import Link from "next/link";
import { Button } from "@mui/material";
import { ToursData } from "@/types/tour"; // Import from your types file
import Pagination from "../Pagination"; // Import the Pagination component
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
interface TravelPackagePageProps {
  toursData: ToursData;
}

const TravelPackagePage: React.FC<TravelPackagePageProps> = ({ toursData }) => {
  console.log("🚀 ~ toursData:", toursData);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const toursPerPage = 6;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const indexOfLastTour = (currentPage + 1) * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = toursData.data.slice(indexOfFirstTour, indexOfLastTour);
  const pageCount = Math.ceil(toursData.data.length / toursPerPage);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 mt-3 lg:mt-0">
        {currentTours.map((pkg) => (
          <Link href={`/top-packages/${pkg.id}`} key={pkg.id}>
            <div className="w-full hover:border-green-500 bg-white rounded-md border-gray-300 border overflow-hidden  transition-shadow duration-300 hover:shadow-xl cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 h-64 md:h-auto relative">
                  <Image
                    src={pkg?.main_image?.url || defaultImage} // Check if main_image and its url exist, otherwise use the default image
                    alt={pkg.title}
                    width={100}
                    height={100}
                    className="rounded-md w-full h-full"
                  />
                  <div className="absolute top-5 left-5 bg-green-500 text-white px-3 py-1 text-sm font-segoe rounded-sm shadow-md">
                    Special Offer 20%
                  </div>
                  <button className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 group">
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                  </button>
                  {/* <button className="absolute bottom-3 left-3 bg-white text-gray-700 px-4 py-2 text-sm font-segoe rounded-sm shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>View on map</span>
                  </button> */}
                </div>
                <div className="w-full md:w-4/6 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-segoe mb-4 text-gray-800">
                      {pkg.title}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Destination :{" "}
                          </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.destination}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Duration : </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.duration} Days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Age range : </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.age_range}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Run : </p>
                          <p className="font-segoe text-gray-800">{pkg.run}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="text-center sm:text-left">
                      {/* <p className="text-sm text-gray-600">From ${pkg.price}</p> */}
                      <p className="text-black font-segoe text-3xl">
                        ${pkg.min_price}
                      </p>
                      <p className="text-sm text-gray-600">Per Person</p>
                    </div>
                    <div className="flex sm:flex-row sm:space-y-0 sm:space-x-2">
                      <Button className="bg-black capitalize mr-3 md:mr-0 text-white font-segoe sm:py-2 px-3 sm:px-6 rounded-sm transition duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105 w-full sm:w-auto">
                        View tour
                      </Button>

                      <Button className="border bg-green-300 md:mx-0  px-5 md:px-2 text-nowrap border-green-600 text-green-900 hover:bg-green-50 font-segoe sm:py-2 sm:px-6 rounded-sm transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
                        Whats App{" "}
                        <div>
                          <span>
                            <FaWhatsapp
                              className="text-green-900 ml-3"
                              size={20}
                            />
                          </span>
                        </div>
                      </Button>
                    </div>
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

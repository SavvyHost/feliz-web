import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ToursData, TourPackage, Attraction } from "@/types/tour";
import PackageDetails from "@/components/templates/PackageTab";
import ExcursionsTab from "@/components/templates/ExcursionsTab";
import OverView from "@/components/templates/OverView";
import fetchData from "@/helper/FetchData";
import Try from "../../../../public/assets/firstImage.jpeg"; // Import default background image

interface AttractionSectionProps {
  attraction: Attraction;
  toursData: ToursData;
  excursionsData: TourPackage[];
}

const AttractionSection: React.FC<AttractionSectionProps> = ({
  attraction,
  toursData,
  excursionsData,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Tours & Tickets");

  if (!attraction) {
    return <div>Loading...</div>; // or some error message
  }

  return (
    <div className="relative h-auto w-full lg:mt-16 mt-3">
      <div className="relative h-96">
        <div className="absolute inset-0">
          <Image
            src={attraction.paner_image?.url || Try}
            alt={`${attraction.name} Background`}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-full max-w-3xl px-4 sm:px-6 md:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-5/12 relative h-48 sm:h-64">
                <Image
                  src={attraction.paner_image?.url || Try}
                  alt={attraction.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-full sm:w-7/12 p-4">
                <h2 className="text-lg sm:text-xl font-segoe mb-2">
                  {attraction.name}
                </h2>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.5</span>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm font-segoe">
                  {attraction.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-28 lg:mt-20 px-4 sm:px-6 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4">
          {["Overview", "Tours & Tickets", "Excursions"].map((tab) => (
            <button
              key={tab}
              className={`text-center font-segoe py-2 px-4 border-b border-b-green-400 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-green-800 text-white border-none"
                  : "bg-white text-gray-700 hover:bg-green-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 lg:px-16">
        <div className="rounded-md">
          {activeTab === "Overview" && <PackageDetails />}
          {activeTab === "Excursions" && (
            <OverView toursData={excursionsData} />
          )}
          {activeTab === "Tours & Tickets" && (
            <ExcursionsTab toursData={toursData} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  try {
    const { id } = context.params;

    // Fetch all attractions
    const attractionsResponse = await fetchData("places");
    const attractions = attractionsResponse.data || [];

    // Find the specific attraction by id
    const attraction = attractions.find(
      (a: Attraction) => a.id === parseInt(id)
    );

    if (!attraction) {
      throw new Error("Attraction not found");
    }

    // Fetch tour packages for this attraction
    const tourPackagesResponse = await fetchData(
      `tours?type=tour_package&place=${id}`
    );
    const tourPackages = tourPackagesResponse.data || [];

    // Fetch excursions for this attraction
    const excursionsResponse = await fetchData(
      `tours?type=excursion&place=${id}`
    );
    const excursions = excursionsResponse.data || [];

    // Prepare the data structure
    const toursData: ToursData = {
      data: tourPackages,
    };

    // Return both as props
    return {
      props: {
        attraction,
        toursData,
        excursionsData: excursions,
      },
    };
  } catch (error) {
    console.error("Error fetching attraction data:", error);

    // Provide default empty data if there's an error
    return {
      props: {
        attraction: null,
        toursData: { data: [] },
        excursionsData: [],
      },
    };
  }
};

export default AttractionSection;

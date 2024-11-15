import React from "react";
import HeroBannerAttraction from "@/components/molecules/Attractions/HeroBannerAttraction";
import AttractionImage from "../../../../public/assets/bgblogs.png";
import Breadcrumb from "@/components/molecules/Attractions/BreadCrumb";
import OverViewAttraction from "@/components/molecules/Attractions/OverViewAttraction";
import {
  ToursSection,
  ExcursionsSection,
  AttractionsSection,
} from "@/components/organisms";
import fetchData from "@/helper/FetchData";
import { TourPackage, ToursData } from "@/types/tour";
import AttractionPageSection from "@/components/molecules/Attractions/AttractionsPageSection";
import SuggestAttractionsSetion from "@/components/molecules/Attractions/SuggestAttractionsSection";
import AttractionCard from "@/components/templates/AttractionCard";

// Define the Props for the component
type City = {
  id: number;
  name: string;
  country_id: number;
};

type Props = {
  city?: City; // Made optional to handle undefined case
  toursData: ToursData;
  excursionData: TourPackage[];
};

// The AttractionsDetails Component
const AttractionsDetails: React.FC<Props> = ({
  city,
  toursData,
  excursionData,
  attractionsData,
}) => {
  // Handle case where city might be undefined
  if (!city) {
    return <div>City not found or data not available.</div>; // Show error message or fallback UI
  }

  // Dynamic breadcrumb items based on city data
  const breadcrumbItems = [
    { label: "Destinations", href: "/" },
    {
      label: city.name,
      href: `/destinations/${city.country_id}/${city.name.toLowerCase()}`,
    },
  ];
  const limitedAttractions = attractionsData.slice(0, 8);
  return (
    <div className="">
      {/* Hero Banner with dynamic city name */}
      <HeroBannerAttraction
        title="Things to do in"
        subtitle={city.name} // Dynamic subtitle based on city
        imageUrl={city.panar_image.url || AttractionImage}
      />

      {/* Breadcrumb with dynamic items */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Overview section with dynamic city name in description */}
      <OverViewAttraction
        title="Overview"
        description={`Discover the beauty and history of ${city.name}, one of the most renowned destinations. Explore its landmarks and enjoy cultural experiences.`}
      />

      {/* Sections for tours and excursions */}
      <div className="lg:px-16 p-4">
        <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
          Tours and Excusrions
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {toursData.data.map((attraction) => (
            <div key={attraction.id} className="tour-card-wrapper">
              <AttractionCard
                id={attraction.id}
                title={attraction.title}
                location={attraction.location}
                price={attraction.min_price}
                image={attraction.main_image.url}
                rating={2}
                duration={attraction.duration}
                ageRange={attraction.age_range}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:px-16 p-4">
        <SuggestAttractionsSetion attractions={limitedAttractions} />
      </div>
      {/* <ExcursionsSection toursData={excursionData} /> */}
    </div>
  );
};

export default AttractionsDetails;

export async function getServerSideProps(context: any) {
  const { id } = context.params; // Get the id from the URL parameters

  // Fetch city details
  const attractionsResponse = await fetchData("cities");
  const toursData: ToursData = await fetchData("tours");
  const attractionsData = await fetchData("places");
  const excursionData = await fetchData("tours?type=excursion");

  // Find the city with the matching id
  const city =
    attractionsResponse?.data?.find(
      (city: City) => city.id.toString() === id
    ) || null;

  return {
    props: {
      city, // Pass the fetched city data (or null)
      toursData,
      attractionsData: attractionsData.data,
      excursionData: excursionData.data as TourPackage[],
    },
  };
}

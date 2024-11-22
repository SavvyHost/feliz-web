import React from "react";
import Slider from "react-slick"; // Import React Slick
import HeroBannerAttraction from "@/components/molecules/Attractions/HeroBannerAttraction";
import AttractionImage from "../../../../public/assets/bgblogs.png";
import Breadcrumb from "@/components/molecules/Attractions/BreadCrumb";
import OverViewAttraction from "@/components/molecules/Attractions/OverViewAttraction";
import AttractionCard from "@/components/templates/AttractionCard";
import SuggestAttractionsSetion from "@/components/molecules/Attractions/SuggestAttractionsSection";
import "slick-carousel/slick/slick.css"; // Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Theme
import fetchData from "@/helper/FetchData";
import { TourPackage, ToursData } from "@/types/tour";

type City = {
  id: number;
  name: string;
  country_id: number;
  panar_image: { url: string };
};

type Props = {
  city?: City;
  toursData: any; // Adjust the type if you have specific tour data
  excursionData: any;
  attractionsData: any[];
};

const AttractionsDetails: React.FC<Props> = ({
  city,
  toursData,
  excursionData,
  attractionsData,
}) => {
  if (!city) {
    return <div>City not found or data not available.</div>;
  }

  const breadcrumbItems = [
    { label: "Destinations", href: "/" },
    {
      label: city.name,
      href: `/destinations/${city.country_id}/${city.name.toLowerCase()}`,
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <HeroBannerAttraction
        title="Things to do in"
        subtitle={city.name}
        imageUrl={city.panar_image.url || AttractionImage}
      />
      <Breadcrumb items={breadcrumbItems} />
      <OverViewAttraction
        title="Overview"
        description={`Discover the beauty and history of ${city.name}, one of the most renowned destinations. Explore its landmarks and enjoy cultural experiences.`}
      />

      <div className="lg:px-16 p-4">
        <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
          Tours and Excursions
        </div>

        {/* Add Slider for Mobile */}
        <div className="block md:hidden">
          <Slider {...sliderSettings}>
            {toursData.data.map((attraction) => (
              <div key={attraction.id} className="px-2">
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
          </Slider>
        </div>

        {/* Grid Layout for Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        <SuggestAttractionsSetion attractions={attractionsData.slice(0, 8)} />
      </div>
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

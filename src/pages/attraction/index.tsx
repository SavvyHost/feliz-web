import HeroBannerAttraction from "@/components/molecules/Attractions/HeroBannerAttraction";
import React from "react";
import AttractionImage from "../../../public/assets/bgblogs.png";
import Breadcrumb from "@/components/molecules/Attractions/BreadCrumb";
import OverViewAttraction from "@/components/molecules/Attractions/OverViewAttraction";
import { ToursSection, ExcursionsSection } from "@/components/organisms"; // Import the Tours and Excursions sections
import fetchData from "@/helper/FetchData"; // Import the data fetching function
import { TourPackage, ToursData } from "@/types/tour"; // Import types
import AttractionPageSection from "@/components/molecules/Attractions/AttractionsPageSection";

type Props = {
  toursData: ToursData; // Type for tours data
  excursionData: TourPackage[]; // Type for excursion tours data
};

const breadcrumbItems = [
  { label: "Destinations", href: "/destinations" },
  { label: "Egypt", href: "/destinations/egypt" },
  { label: "Luxor", href: "/destinations/egypt/luxor" },
];

const Attractions: React.FC<Props> = ({ toursData, excursionData }) => {
  return (
    <div className="">
      <HeroBannerAttraction
        title="Things to do in"
        subtitle="Luxor"
        imageUrl={AttractionImage}
      />
      <Breadcrumb items={breadcrumbItems} />
      <OverViewAttraction
        title="Attraction Overview"
        description="Discover the beauty and history of Luxor, one of Egypt's most renowned destinations. This ancient city is home to some of the world's most iconic landmarks, including the Valley of the Kings, Karnak Temple, and the Luxor Temple. Whether you're exploring its rich archaeological sites or enjoying a leisurely cruise along the Nile, Luxor offers a unique blend of culture and adventure. Experience the vibrant local markets, indulge in traditional cuisine, and immerse yourself in the fascinating history that surrounds this incredible destination."
      />

      {/* Include Tours and Excursions sections */}
      <AttractionPageSection toursData={toursData} />
      <ExcursionsSection toursData={excursionData} />
    </div>
  );
};

export default Attractions;

// Server-side data fetching for tours and excursions
export async function getServerSideProps() {
  const toursData: ToursData = await fetchData("tours");
  const excursionData = await fetchData("tours?type=excursion"); // Fetch excursion data

  return {
    props: {
      toursData: toursData,
      excursionData: excursionData.data as TourPackage[], // Pass excursion data
    },
  };
}

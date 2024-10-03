import {
  AdventuresSection,
  AttractionsSection,
  DestinationSection,
  ExcursionsSection,
  HeroSection,
  OffersSection,
  PeaopleSaySection,
  ToursSection,
  WhyUsSection,
} from "@/components/organisms";
import CallToActionSection from "@/components/organisms/CTAsection";
import fetchData from "@/helper/FetchData";
import { TourPackage, ToursData } from "@/types/tour";
import { Destination } from "./blogs";
import { Attraction } from "@/types/attraction"; // Create a type for attraction

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
};

interface HomeProps {
  toursData: ToursData; // Tours data for general tours
  excursionData: TourPackage[]; // Excursion tours data
  blogData: {
    data: Blog[]; // blogData will contain a data array
  };
  Destinations: Destination[];
  attractionsData: Attraction[]; // New: Attraction data
}

export default function Home({
  toursData,
  excursionData,
  blogData,
  Destinations,
  attractionsData, // New: Destructure attractionsData
}: HomeProps) {
  const limitedDestinations = Destinations.slice(0, 8);
  const limitedAttractions = attractionsData.slice(0, 9);

  return (
    <>
      <HeroSection />
      <div className="lg:px-16 p-4 ">
        <OffersSection />
      </div>
      <div className="lg:px-16 p-4 ">
        <WhyUsSection />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <ToursSection toursData={toursData} />
      </div>
      {/* <ExcursionsSection toursData={excursionData} /> */}
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <DestinationSection Destinations={limitedDestinations} />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <AttractionsSection attractions={limitedAttractions} />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <AdventuresSection />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <CallToActionSection />
      </div>
      <div className="lg:px-16 p-4  ">
        <PeaopleSaySection />
      </div>

      {/* Pass attractions data */}

      {/* Add Blog Section */}
      {/* <BlogSection blogData={blogData} /> */}
    </>
  );
}

export async function getServerSideProps() {
  const toursData: ToursData = await fetchData("tours?type=tour_package");
  const excursionData = await fetchData("tours?type=excursion"); // Excursion tours data
  const Destinations = await fetchData("cities");
  const blogData = await fetchData("blogs");
  const attractionsData = await fetchData("places"); // New: Fetch attractions data

  return {
    props: {
      toursData,
      excursionData: excursionData.data as TourPackage[], // Pass the renamed variable
      blogData,
      Destinations: Destinations.data,
      attractionsData: attractionsData.data, // Pass attractions data
    },
  };
}

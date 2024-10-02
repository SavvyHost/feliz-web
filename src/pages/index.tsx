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

  return (
    <>
      <HeroSection />
      <OffersSection />
      <WhyUsSection />
      <ToursSection toursData={toursData} />
      {/* <ExcursionsSection toursData={excursionData} /> */}
      <DestinationSection Destinations={limitedDestinations} />
      <AttractionsSection attractions={attractionsData} />{" "}
      {/* Pass attractions data */}
      <AdventuresSection />
      <CallToActionSection />
      <PeaopleSaySection />
      {/* Add Blog Section */}
      {/* <BlogSection blogData={blogData} /> */}
    </>
  );
}

export async function getServerSideProps() {
  const toursData: ToursData = await fetchData("tours");
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

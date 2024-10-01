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
import BlogSection from "@/components/organisms/BlogSection";
import CallToActionSection from "@/components/organisms/CTAsection";
import fetchData from "@/helper/FetchData";
import { TourPackage, ToursData } from "@/types/tour";
import { Destination } from "./blogs";

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
};

interface HomeProps {
  toursData: ToursData; // Tours data for general tours
  excursionData: TourPackage[]; // Rename for excursion tours data
  blogData: {
    data: Blog[]; // blogData will contain a data array
  };
  Destinations: Destination[];
}

export default function Home({
  toursData,
  excursionData,
  blogData,
  Destinations,
}: HomeProps) {
  console.log("🚀 ~ Home ~ toursData:", toursData);
  console.log("🚀 ~ Home ~ excursionData:", excursionData);
  console.log("🚀 ~ Home ~ blogData:", blogData);
  const limitedDestinations = Destinations.slice(0, 8);
  return (
    <>
      <HeroSection />
      <OffersSection />
      <WhyUsSection />
      <ToursSection toursData={toursData} />
      {/* <ExcursionsSection toursData={excursionData} /> */}
      <DestinationSection Destinations={limitedDestinations} />
      <AttractionsSection />
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
  const excursionData = await fetchData("tours?type=excursion"); // Rename this variable
  const Destinations = await fetchData("cities");
  const blogData = await fetchData("blogs");

  return {
    props: {
      toursData: toursData,
      excursionData: excursionData.data as TourPackage[], // Pass the renamed variable
      blogData: blogData,
      Destinations: Destinations.data,
    },
  };
}

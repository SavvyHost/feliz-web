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
import { Attraction } from "@/types/tour";
import BlogSection from "@/components/organisms/BlogSection";
import RecentlyViewedSection from "@/components/templates/RecentlyViewedSection";
import Seo from "@/components/molecules/Seo";

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
};

interface Category {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  description: string | null;
  is_active: number;
  created_at: string;
  images: any[];
  panar_image: {
    id: number;
    url: string;
    name: string;
  };
}

interface HomeProps {
  toursData: ToursData;
  excursionData: TourPackage[];
  blogData: {
    data: Blog[];
  };
  Destinations: Destination[];
  attractionsData: Attraction[];
  categories: Category[]; // New: Categories data
  seoData: any;
}

export default function Home({
  toursData,
  excursionData,
  blogData,
  Destinations,
  attractionsData,
  seoData,
  categories, // New: Destructure categories
}: HomeProps) {
  const limitedDestinations = Destinations.slice(0, 8);
  const limitedAttractions = attractionsData.slice(0, 8);

  return (
    <>
      <Seo
        pageTitle={seoData?.title}
        metaDescription={seoData?.description}
        ogDescription={seoData?.og_description}
        keywords={seoData?.keywords}
        ogImage={seoData?.og_image?.url}
        ogUrl={seoData?.ogUrl}
        ogTitle={seoData?.og_title}
      />
      <HeroSection />
      <div className="lg:px-16 p-4 ">
        <WhyUsSection />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <ToursSection toursData={toursData} />
      </div>
      {/* <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <DestinationSection Destinations={limitedDestinations} />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <AttractionsSection attractions={limitedAttractions} />
      </div> */}
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <AdventuresSection categories={categories} />{" "}
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <CallToActionSection />
      </div>
      <div className="lg:px-16 p-4  ">
        <PeaopleSaySection />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <BlogSection blogData={blogData} />
      </div>
      <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <RecentlyViewedSection />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const toursData: ToursData = await fetchData("tours?type=tour_package");
  const excursionData = await fetchData("tours?type=excursion");
  const Destinations = await fetchData("cities");
  const blogData = await fetchData("blogs");
  const attractionsData = await fetchData("places");
  const categoriesData = await fetchData("categories"); // New: Fetch categories data
  const seoData = await fetchData("seo-page?model_type=Home");

  return {
    props: {
      toursData,
      excursionData: excursionData.data as TourPackage[],
      blogData,
      Destinations: Destinations.data,
      attractionsData: attractionsData.data,
      categories: categoriesData.data, // New: Pass categories data
      seoData: seoData?.data,
    },
  };
}

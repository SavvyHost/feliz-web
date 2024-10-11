import React from "react";
import HeroBlog from "@/components/molecules/Blogs/HeroBlog";
import DestinationSection from "@/components/organisms/DestinationSection";
import BlogSection from "@/components/organisms/BlogSection";
import fetchData from "@/helper/FetchData";
import InterestsSection from "@/components/molecules/Blogs/Intersts";
import RecentBlog from "@/components/organisms/RecentBlog";
import { ToursData } from "@/types/tour";

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
};

export type Destination = {
  id: number;
  name: string;
  panar_image: string;
  image?: string; // Optional property if it's sometimes missing
};

type Props = {
  blogData: {
    data: Blog[]; // blogData will contain a data array
  };
  Destinations: Destination[];
};

const BLogs: React.FC<Props> = ({ blogData, Destinations }) => {
  const limitedDestinations = Destinations.slice(0, 8);
  return (
    <div className="bg-[#FAFAFA] lg:px-16 mt-16 pt-3 px-4 py-3">
      {/* <HeroBlog /> */}
      {/* <InterestsSection /> */}
      {/* <div className="lg:px-16 p-4 bg-[#FAFAFA] ">
        <DestinationSection Destinations={limitedDestinations} />
      </div> */}

      <div className=" ">
        <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer mb-4">
          Recent Blogs
        </div>
        <RecentBlog />
      </div>
      <div className="mt-4">
        <BlogSection blogData={blogData} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const blogData = await fetchData("blogs"); // Fetch blogs data
  const Destinations = await fetchData("cities"); // Fetch destinations data

  return {
    props: {
      blogData: blogData, // blogData should already be in the correct format
      Destinations: Destinations.data, // Ensure Destinations is an array of data
    },
  };
}

export default BLogs;

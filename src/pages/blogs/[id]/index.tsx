import React from "react";
import BLogData from "@/components/molecules/BlogDetails/BLogData";
import HeroSectionBlogs from "@/components/molecules/BlogDetails/HeroBlogDetails";
import RelatedTours from "@/components/molecules/BlogDetails/RelatedTours";
import Blog from "@/components/molecules/Blogs/Blog";
import fetchData from "@/helper/FetchData";
import { GetServerSidePropsContext } from "next";

type BlogData = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
};

type Props = {
  blogData: {
    data: BlogData[];
  };
  DetailBlogs: BlogData; // Adjusted to match the data structure
};

const BlogDetails: React.FC<Props> = ({ blogData, DetailBlogs }) => {
  console.log("🚀 ~ blogData:", blogData);
  console.log("🚀 ~ DetailBlogs:", DetailBlogs);

  return (
    <div className="mt-16 bg-[#FAFAFA]">
      <HeroSectionBlogs DetailBlogs={DetailBlogs} />

      <div className="flex flex-col lg:flex-row w-full mt-11 px-0">
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          <BLogData DetailBlogs={DetailBlogs} />
        </div>
        <div className="w-full lg:w-1/3">
          <RelatedTours />
        </div>
      </div>
      <h3 className="font-segoe text-3xl ml-5 md:mb-6 mb-6">
        Related Articles
      </h3>
      <Blog blogData={blogData} />
    </div>
  );
};

export default BlogDetails;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Ensure context.params is defined
  const params = context.params || {};
  const id = params.id as string | undefined; // Type casting for safety

  if (!id) {
    // Handle cases where id is not present
    return {
      notFound: true, // Optionally return a 404 page if id is missing
    };
  }

  // Fetch DetailBlogs using the id
  const DetailBlogs = await fetchData(`blogs/${id}`);

  // Fetch blogData for the blog section
  const blogData = await fetchData("blogs"); // Adjust the endpoint if needed

  return {
    props: {
      DetailBlogs: DetailBlogs.data, // Ensure this matches the expected structure
      blogData: blogData.data, // Ensure this matches the expected structure
    },
  };
}

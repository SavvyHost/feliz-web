import React, { useEffect, useState } from "react";
import BLogData from "@/components/molecules/BlogDetails/BLogData";
import HeroSectionBlogs from "@/components/molecules/BlogDetails/HeroBlogDetails";
import RelatedTours from "@/components/molecules/BlogDetails/RelatedTours";
import Blog from "@/components/molecules/Blogs/Blog";
import fetchData from "@/helper/FetchData";
import { GetServerSidePropsContext } from "next";
import HorizontalCard from "@/components/molecules/BlogDetails/RelatedTours";
import { ArrowUpToLine } from "lucide-react";
import Seo from "@/components/molecules/Seo";

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
  DetailBlogs: BlogData;
  seoData: any;
};

const BlogDetails: React.FC<Props> = ({ blogData, DetailBlogs, seoData }) => {
  console.log("🚀 ~ blogData:", blogData);
  console.log("🚀 ~ DetailBlogs:", DetailBlogs);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

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
      <div className="mt-16 bg-[#FAFAFA]">
        <HeroSectionBlogs DetailBlogs={DetailBlogs} />

        <div className="flex flex-col lg:flex-row w-full mt-11 px-4">
          <div className="w-full lg:w-2/3 mb-0 lg:mb-8">
            <BLogData DetailBlogs={DetailBlogs} />
          </div>
          <div className="w-full lg:w-1/3">
            <HorizontalCard
              imageSrc={DetailBlogs.image}
              title={DetailBlogs.title}
              date={DetailBlogs.created_at}
              link={`/blog/${DetailBlogs.id}`} // Assuming this is the correct link format
            />
          </div>
        </div>
        <div className="lg:px-16 p-2">
          <h3 className="font-segoe text-3xl md:mb-6 mb-6 lg:mt-0 my-5">
            Related Articles
          </h3>
          <Blog blogData={blogData} />
        </div>

        {/* Scroll to Top Button */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-1 rounded-none shadow-lg transition-opacity duration-300 hover:bg-blue-600"
            aria-label="Scroll to top"
          >
            <ArrowUpToLine />
          </button>
        )}
      </div>
    </>
  );
};

export default BlogDetails;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params || {};
  const id = params.id as string | undefined;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const DetailBlogs = await fetchData(`blogs/${id}`);
  const blogData = await fetchData("blogs");
  const seoData: any = await fetchData(
    `seo-page?model_type=blog&model_id=${id}`
  );

  return {
    props: {
      DetailBlogs: DetailBlogs.data,
      blogData: blogData.data,
      seoData: seoData?.data,
    },
  };
}

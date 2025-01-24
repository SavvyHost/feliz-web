import Pagination from "@/components/molecules/Pagination";
import Laptop from "@/components/templates/laptop/Laptop";
import Mobile from "@/components/templates/mobile/Mobile";
import fetchData from "@/helper/FetchData";
import { ToursData } from "@/types/tour";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Explore from "@/components/molecules/ExploreExcursios";
import Seo from "@/components/molecules/Seo";

interface HomeProps {
  toursData: ToursData;
  currentPage: number;
  categories: Category[];

  seoData: any;
}

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

export default function Home({
  toursData,
  currentPage,
  categories,
  seoData,
}: HomeProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const toursPerPage = 6;
  const pageCount = Math.ceil(toursData.data.length / toursPerPage);

  console.log("ali");
  const updateToursData = async () => {
    let endpoint = "tours?type=tour_package";
    if (router.query.category) {
      endpoint += `&category=${router.query.category}`;
    }
    if (router.query.page) {
      endpoint += `&page=${router.query.page}`;
    }

    const data: ToursData = await fetchData(endpoint);
    console.log(data);
  };

  useEffect(() => {
    updateToursData();
  }, [router.query.category, router.query.page]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: selectedPage + 1 },
    });
  };

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
      <div className=" p-0 bg-[#FAFAFA] ">
        <div className="block lg:hidden">
          <Mobile toursData={toursData} categories={categories} />
        </div>
        <div className="hidden lg:block ">
          <Laptop toursData={toursData} categories={categories} />
        </div>
        {/* 
      <Explore
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        router={router}
      /> */}
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const currentPage = query.page ? parseInt(query.page) : 1;
  let endpoint = "tours?type=tour_package";
  if (Object.keys(query).length > 0) {
    const queryParams = new URLSearchParams(query).toString();
    endpoint += `&${queryParams}`;
  }
  const data: ToursData = await fetchData(endpoint);
  const categoriesData = await fetchData("categories");
  const seoData: ToursData = await fetchData("seo-page?model_type=tour");

  return {
    props: {
      toursData: data,
      categories: categoriesData.data,
      currentPage,
      seoData: seoData?.data,
    },
  };
}

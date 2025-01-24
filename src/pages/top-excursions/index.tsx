"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Excursions from "@/components/molecules/Excursions/Excursions";
import fetchData from "@/helper/FetchData";
import { TourPackage } from "@/types/tour";
import SearchExcursions from "@/components/atoms/SearchExcursions/SearchExcursios";
import Banner from "@/components/templates/laptop/Banner";
import { useScroll } from "@/hooks/useScroll";
import Seo from "@/components/molecules/Seo";

interface HomeProps {
  toursData: TourPackage[];
  seoData: any;
}

const ITEMS_PER_PAGE = 8;

const ExcursionsSkeleton: React.FC = () => (
  <div className="animate-pulse flex flex-col space-y-4">
    <div className="h-40 bg-gray-300 rounded-md"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>
);

const Home: React.FC<HomeProps> = ({ toursData, seoData }) => {
  const [displayedTours, setDisplayedTours] = useState<TourPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const { visible, scrolledPastThreshold, isAtTop } = useScroll();

  const loadMoreTours = useCallback(() => {
    if (isLoading || displayedTours.length >= toursData.length) return;

    setIsLoading(true);

    setTimeout(() => {
      const startIndex = displayedTours.length;
      const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, toursData.length);
      const newTours = toursData.slice(startIndex, endIndex);

      setDisplayedTours((prev) => [...prev, ...newTours]);
      setIsLoading(false);
    }, 1000);
  }, [toursData, displayedTours, isLoading]);

  useEffect(() => {
    setTimeout(() => {
      setDisplayedTours(toursData.slice(0, ITEMS_PER_PAGE));
      setIsInitialLoading(false);
    }, 500);
  }, [toursData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadMoreTours();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoadingRef = loadingRef.current;
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef);
      }
    };
  }, [loadMoreTours]);

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

      <div className="">
        <div className="h-[140px] lg:hidden block" />
        <div
          className={`lg:hidden block fixed left-0 right-0 z-30 transition-all duration-300 ease-in-out
          ${visible ? "top-[70px]" : "top-0"}
          ${scrolledPastThreshold ? "bg-white shadow-md" : "bg-white"}
          ${isAtTop ? "" : "backdrop-blur-lg bg-white/90"}`}
        >
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <SearchExcursions />
          </div>
        </div>
        <div className="lg:block hidden" style={{ padding: "0 !important" }}>
          <Banner overlayText="Explore Amazing Excusrsions" />
        </div>
        <h2 className="md:text-3xl text-xl font-segoe my-6 lg:px-16 p-2 text-start">
          Excursions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 lg:px-16">
          {isInitialLoading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <ExcursionsSkeleton key={index} />
              ))
            : displayedTours.map((tour) => (
                <Excursions
                  key={tour.id}
                  id={tour.id}
                  title={tour.title}
                  location={tour.location}
                  price={tour.min_price}
                  image={tour.main_image.url}
                  rating={2}
                  destination={tour.destination}
                  duration={tour.duration}
                  ageRange={tour.age_range}
                />
              ))}
        </div>
        <div ref={loadingRef} className="flex justify-center py-8">
          {isLoading && displayedTours.length < toursData.length && (
            <button className="w-fit p-2 rounded-md bg-blue-700 text-white ">
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await fetchData("tours?type=excursion");
  const seoData: any = await fetchData("seo-page?model_type=tour");
  return {
    props: {
      toursData: data.data as TourPackage[],
      seoData: seoData?.data,
    },
  };
}

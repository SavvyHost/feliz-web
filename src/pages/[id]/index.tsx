import { GetServerSidePropsContext } from "next";
import fetchData from "@/helper/FetchData";
import { TourDetail } from "@/types/tour";
import Image from "next/image";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Loader from "@/components/molecules/Loader";

interface AttractionDetailProps {
  attraction: TourDetail | null;
}

export default function AttractionDetail({
  attraction,
}: AttractionDetailProps) {
  useEffect(() => {
    // Initialize Fancybox
    Fancybox.bind("[data-fancybox]", {
      Toolbar: false,
      closeButton: "auto", // or use `true` or `false` based on the actual option available
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  if (!attraction) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-20 lg:mt-28 container mx-auto px-4">
      <h1 className="lg:text-2xl text-xl font-segoe font-semibold mb-3 mt-3 text-center pb-2">
        {attraction.title}
      </h1>
      <div className="relative mb-8 w-full mx-auto">
        <a
          href={attraction.main_image}
          data-fancybox="gallery"
          data-caption={attraction.title}
        >
          <div className="relative w-full" style={{ height: "300px" }}>
            <Image
              src={attraction.main_image}
              alt={attraction.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-35 rounded-lg">
            <span className="text-white lg:text-4xl text-lg  capitalize font-segoe">
              Click here for more images
            </span>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-segoe font-semibold mb-4">
            Description
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: attraction.description || "" }}
            className="text-gray-700"
          />
          <div className="mt-6">
            <h3 className="text-xl font-segoe font-semibold mb-3">Details</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Duration: {attraction.duration} days</li>
              <li>Age Range: {attraction.age_range}</li>
              <li>Run: {attraction.run}</li>
              <li>Transportation: {attraction.transportation_mode}</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-segoe font-semibold mb-4">
            What is Included
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {attraction.tour_includes?.map((item, index) => (
              <li key={index}>{item.description}</li>
            )) || <li>No items included</li>}
          </ul>
        </div>
      </div>
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-segoe font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {attraction.images?.map((image, index) => (
            <a
              key={index}
              href={image}
              data-fancybox="gallery"
              data-caption={`Gallery image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg object-cover cursor-pointer"
              />
            </a>
          )) || <div>No images available</div>}
        </div>
      </div>
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-segoe font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {attraction.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
            >
              {tag}
            </span>
          )) || <span>No tags available</span>}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };
  try {
    const response = await fetchData(`tours/${id}`);
    console.log("🚀 ~ getServerSideProps ~ response:", response);

    const attraction: TourDetail = response.data;

    if (!attraction) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        attraction,
      },
    };
  } catch (error) {
    console.error("Error fetching attraction data:", error);
    return {
      props: {
        attraction: null,
      },
    };
  }
}

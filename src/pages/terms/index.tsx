// components/TermsSection.tsx

import Image from "next/image";
import React from "react";
import PrivacyImage from "../../../public/assets/egys.jpeg";
import fetchData from "@/helper/FetchData";
type ContentItem = {
  title: string;
  description: string;
};

const contentItems: ContentItem[] = [
  {
    title: "A Guide to Igniting Your Imagination",
    description:
      "Uncover the secrets to sparking creativity and turning your ideas into reality. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
  },
  {
    title: "Unlock Your Creative Potential",
    description:
      "Explore innovative techniques and unleash your creative prowess. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsam, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
  },
  {
    title: "Mastering the Art of Imagination",
    description:
      "Learn the skills and strategies to master the art of imagination. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsam, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
  },
  {
    title: "Inspiration for Every Creative Soul",
    description:
      "Find inspiration for your creative journey and connect with a community of like-minded individuals. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsam, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.",
  },
];

const TermsSection: React.FC = ({ data }) => {
  console.log("🚀 ~ data:", data);
  return (
    <>
      <div className="relative bg-gradient-to-r mt-16 lg:mt-24 from-gray-900 to-gray-800 py-16 font-[sans-serif]">
        <div className="absolute inset-0">
          <Image
            src={PrivacyImage}
            alt="Background Image"
            className="w-full h-full object-cover opacity-20"
            width={100}
            height={100}
          />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-8 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-segoe leading-tight mb-6">
            Terms Condation
          </h1>
          <p className="text-lg md:text-xl mb-12 font-segoe">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            auctor arcu, at fermentum dui. Maecenas.
          </p>
        </div>
      </div>
      <div className="bg-white sm:px-6 p-4 font-segoe ">
        <div className="">
          <div className="grid gap-10">
            {/* {contentItems.map((item, index) => ( */}
            <div>
              {/* <h3 className="text-2xl font-segoe text-gray-800">
                  {item.title}
                </h3> */}
              <div className="mt-4">
                <p
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: data?.data[2]?.value?.terms,
                  }}
                />
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsSection;
export async function getServerSideProps() {
  const data = await fetchData("settings?collection=terms");

  return {
    props: {
      data: data,
    },
  };
}

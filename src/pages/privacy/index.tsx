// components/PrivacyPolicySection.tsx

import Image from "next/image";
import React from "react";
import PrivacyImage from "../../../public/assets/egys.jpeg";
import fetchData from "@/helper/FetchData";
type PrivacyPolicyItem = {
  title: string;
  content: string;
};



const PrivacyPolicySection: React.FC = ({data}) => {
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
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl mb-12 font-segoe">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            auctor arcu, at fermentum dui. Maecenas.
          </p>
        </div>
      </div>

      <div className="bg-white px-6 font-segoe mt-2">
        <div className="grid gap-10">
          <div className="mt-4">
            <p
              className=""
              dangerouslySetInnerHTML={{
                __html: data?.data[0]?.value?.privacyData,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicySection;
export async function getServerSideProps() {
  const data = await fetchData("settings?collection=privacy");

  return {
    props: {
      data: data,
    },
  };
}

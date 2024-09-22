import React from "react";
import Image from "next/image";
import backgroundImage from "../../../../public/assets/pyr.jpeg"; // Replace with your actual image path
import User from "../../../../public/assets/userbg.jpeg"; // Replace with your card image path

// Define the type for DetailBlogs
type DetailBlogsType = {
  image: string;
  title: string;
  content: string;
  user?: {
    name: string;
  };
};

// Define the props type for HeroSectionBlogs
type HeroSectionBlogsProps = {
  DetailBlogs: DetailBlogsType;
};

// Define the HeroSectionBlogs component
const HeroSectionBlogs: React.FC<HeroSectionBlogsProps> = ({ DetailBlogs }) => {
  return (
    <div className="relative w-full h-[50vh] md:h-[80vh] bg-gray-200 ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={DetailBlogs?.image || backgroundImage} // Fallback to backgroundImage if DetailBlogs?.image is missing
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Blurred Card */}
      <div className="absolute inset-x-4 transform translate-y-16 md:inset-x-8 bottom-8 md:bottom-12 mx-auto p-4 md:p-6 bg-white bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg max-w-xs md:max-w-3xl h-auto flex flex-col items-center justify-between">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">
            {DetailBlogs?.title}
          </h1>
          {/* <p
            className="text-sm md:text-base text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: DetailBlogs?.content.slice(0, 300),
            }}
          /> */}
        </div>
        {/* Author Section */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mt-4">
          <Image
            src={User}
            alt="Author Image"
            className="rounded-full w-12 h-12"
            width={56}
            height={56}
          />
          <p className="text-sm md:text-base text-gray-800 font-medium">
            By: {DetailBlogs?.user?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionBlogs;

import fetchData from "@/helper/FetchData";
import Image from "next/image";
import React from "react";

const About = ({ data }) => {
  return (
    <div className="2xl:container lg:mt-20 mt-14 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-segoe leading-9 text-yellow-800 pb-4">
            About Us
          </h1>
          <p
            className="font-segoe text-base leading-6 text-gray-600 "
            dangerouslySetInnerHTML={{ __html: data?.data[0]?.value?.AboutUs }}
          />
        </div>
        <div className="w-full lg:w-8/12 ">
          <Image
            width={100}
            height={100}
            className="w-full h-full"
            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            alt="A group of People"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-segoe leading-9 text-yellow-800 pb-4">
            Our Story
          </h1>
          <p
            className="font-segoe text-base leading-6 text-gray-600 "
            dangerouslySetInnerHTML={{ __html: data?.data[0]?.value?.OurStory }}
          />
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={100}
                height={100}
                className="block"
                src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                alt="Alexa featured Image"
              />

              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Alexa
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={100}
                height={100}
                className="block"
                src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                alt="Olivia featured Image"
              />

              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Olivia
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={100}
                height={100}
                className="block"
                src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                alt="Liam featued Image"
              />

              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Liam
              </p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                width={100}
                height={100}
                className="block "
                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                alt="Elijah featured Image"
              />

              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Elijah
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
export async function getServerSideProps() {
  const data = await fetchData("settings?collection=about");

  return {
    props: {
      data: data,
    },
  };
}

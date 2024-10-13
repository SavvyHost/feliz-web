import { DestinationSection } from "@/components/organisms";
import fetchData from "@/helper/FetchData";
import React from "react";

type Props = {
  destinations: any[]; // Update this type based on your data structure
};

const Destinations = ({ destinations }: Props) => {
  // Ensure destinations is an array and then slice it
  const limitedDestinations = Array.isArray(destinations)
    ? destinations.slice(0, 8)
    : [];

  return (
    <div className="mt-8">
      <div className="lg:px-16 p-4 bg-[#FAFAFA]">
        <DestinationSection Destinations={limitedDestinations} />
      </div>
    </div>
  );
};

export default Destinations;

export async function getServerSideProps() {
  const destinationsData = await fetchData("cities");

  return {
    props: {
      destinations: destinationsData.data || [], // Ensure you return an array in case data is undefined
    },
  };
}

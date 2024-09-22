import React from "react";
import Excursions from "@/components/molecules/Excursions/Excursions";
import fetchData from "@/helper/FetchData";
import { TourPackage } from "@/types/tour";
import SearchExcursions from "@/components/atoms/SearchExcursions/SearchExcursios";
import Explore from "@/components/molecules/ExploreExcursios";
import Drops from "@/components/atoms/drops";

interface HomeProps {
  toursData: TourPackage[];
}

const Home: React.FC<HomeProps> = ({ toursData }) => {
  return (
    <div>
      <div className="mt-28">
        <SearchExcursions />
      </div>
      <div>
        <Explore />
      </div>
      <div>
        <Drops />
      </div>
      <div>
        <h2 className="md:text-3xl text-xl font-segoe ml-5 mb-6 text-start">
          Tours and Tickets to Experience Giza Pyramids
        </h2>
        <Excursions toursData={toursData} />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await fetchData("tours?type=excursion");

  return {
    props: {
      toursData: data.data as TourPackage[], // Ensure this matches the type
    },
  };
}

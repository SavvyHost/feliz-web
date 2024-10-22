import Explore from "@/components/molecules/ExploreTours";
import Laptop from "@/components/templates/laptop/Laptop";
import Mobile from "@/components/templates/mobile/Mobile";

import fetchData from "@/helper/FetchData";
import { ToursData } from "@/types/tour";

interface HomeProps {
  toursData: ToursData;
}

export default function Home({ toursData }: HomeProps) {
  return (
    <div className="md:p-6 p-0 bg-[#FAFAFA] lg:px-16 ">
      {/* Mobile view */}

      <div className="block lg:hidden">
        <Mobile toursData={toursData} />
      </div>

      {/* Laptop view */}
      <div className="hidden lg:block  ">
        <Laptop toursData={toursData} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data: ToursData = await fetchData("tours?type=tour_package");

  return {
    props: {
      toursData: data,
    },
  };
}

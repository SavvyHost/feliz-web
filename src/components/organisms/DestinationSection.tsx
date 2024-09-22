import React from "react";
import DestinationRow from "../molecules/Destination/Destination";

// Define the Destination type with all required properties
type Destination = {
  id: number;
  name: string;
  panar_image: string;
  image?: string; // Add optional property if it's sometimes missing
};

// Define the props type for DestinationSection
type Props = {
  Destinations: Destination[];
};

const DestinationSection: React.FC<Props> = ({ Destinations }) => {
  // Map Destinations directly, as Destinations is already an array
  const mappedDestinations = Destinations.map((dest) => ({
    name: dest.name,
    panar_image: dest.panar_image, // Ensure the correct property name
  }));

  return (
    <div className="bg-[#FAFAFA]">
      <div className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer md:p-10 p-5">
        Destination
      </div>
      <div>
        <DestinationRow Destinations={mappedDestinations} />
      </div>
    </div>
  );
};

export default DestinationSection;

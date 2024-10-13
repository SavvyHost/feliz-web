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
    id: dest.id, // Ensure the correct property name
  }));

  return (
    <div className="">
      <div className="text-left lg:my-8 my-4 text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer">
        Destination
      </div>
      <div>
        <DestinationRow Destinations={mappedDestinations} />
      </div>
    </div>
  );
};

export default DestinationSection;

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import DefaultImage from "../../../../public/assets/bgblogs.png";

interface City {
  name: string;
  image: any;
  description: string;
}

interface CitySelectionProps {
  formData: any;
  onChange: (stepData: any) => void;
}

const CitySelection: React.FC<CitySelectionProps> = ({
  formData,
  onChange,
}) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cities: City[] = [
    {
      name: "Egypt",
      image: DefaultImage,
      description: "Explore ancient pyramids and cruise the Nile",
    },
    {
      name: "Jordan",
      image: DefaultImage,
      description: "Discover Petra and float in the Dead Sea",
    },
    {
      name: "Dubai",
      image: DefaultImage,
      description: "Experience luxury and futuristic architecture",
    },
    {
      name: "Oman",
      image: DefaultImage,
      description: "Enjoy pristine beaches and traditional culture",
    },
  ];

  const handleCitySelect = (cityName: string) => {
    const updatedCities = formData.selectedCities
      ? [...formData.selectedCities]
      : [];
    const cityIndex = updatedCities.indexOf(cityName);

    if (cityIndex > -1) {
      updatedCities.splice(cityIndex, 1);
    } else {
      updatedCities.push(cityName);
    }

    onChange({ selectedCities: updatedCities });
  };

  const isCitySelected = (cityName: string) => {
    return (
      formData.selectedCities && formData.selectedCities.includes(cityName)
    );
  };

  return (
    <div className="pt-4 lg:px-32">
      <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
        Choose Your Dream Destinations
      </h2>
      <p className="text-center text-green-600 mb-8">
        Select one or more cities for your journey
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cities.map((city, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-sm shadow-lg cursor-pointer transition-all duration-300 ${
              isCitySelected(city.name) ? "ring-4 ring-green-500" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCitySelect(city.name)}
            onMouseEnter={() => setHoveredCity(city.name)}
            onMouseLeave={() => setHoveredCity(null)}
          >
            <div className="relative h-64">
              <Image
                src={city.image}
                alt={city.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:opacity-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{city.name}</h3>
                <p className="text-sm opacity-80">{city.description}</p>
              </div>
            </div>
            <motion.div
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity:
                  hoveredCity === city.name || isCitySelected(city.name)
                    ? 1
                    : 0,
                scale:
                  hoveredCity === city.name || isCitySelected(city.name)
                    ? 1
                    : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {isCitySelected(city.name) ? (
                <Check className="w-6 h-6 text-green-500" />
              ) : (
                <Plus className="w-6 h-6 text-green-600" />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Selected Destinations:</h3>
        {formData.selectedCities && formData.selectedCities.length > 0 ? (
          <ul className="list-decimal list-inside flex gap-x-2">
            {formData.selectedCities.map((city: string) => (
              <li key={city} className="text-lg text-green-700">
                {city}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-500 text-lg">
            No destinations selected yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CitySelection;

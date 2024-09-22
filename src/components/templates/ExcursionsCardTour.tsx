import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { BsHeart, BsMap, BsClock, BsFillCircleFill } from "react-icons/bs";
import { Button } from "@mui/material";
import Link from "next/link";
import { TourPackage } from "@/types/tour";
import defaultImage from "../../../public/assets/camels.jpeg";

interface ExcursionsProps {
  toursData: TourPackage[];
}

const sampleToursData: TourPackage[] = [
  {
    id: 1,
    name: "Giza Pyramids Tour", // Added name
    main_image: defaultImage,
    title: "Giza Pyramids Tour",
    destination: "Giza",
    duration: "1",
    starRating: 5,
    min_price: 50,
    price: 40, // Added price
    amenities: ["Guide", "Transport"], // Added amenities
    accommodationType: "Hotel", // Added accommodation type
    tour_prices: [{ prices: [{ price: 40 }] }],
    description: "Explore the majestic Giza Pyramids with a guided tour.", // Optional description
    age_range: "All Ages", // Added age range
    language: "English", // Added language
    location: "Giza, Egypt", // Optional location
    rating: 4.8, // Optional rating
    is_best_deal: 1, // Optional best deal flag
  },
  {
    id: 2,
    name: "Nile Cruise", // Added name
    main_image: defaultImage,
    title: "Nile Cruise Adventure",
    destination: "Cairo",
    duration: "3",
    starRating: 4,
    min_price: 150,
    price: 120, // Added price
    amenities: ["Meals", "Entertainment"], // Added amenities
    accommodationType: "Cruise Ship", // Added accommodation type
    tour_prices: [{ prices: [{ price: 120 }] }],
    description: "Enjoy a relaxing cruise on the Nile River.", // Optional description
    age_range: "12 and up", // Added age range
    language: "Arabic", // Added language
    location: "Cairo, Egypt", // Optional location
    rating: 4.5, // Optional rating
    is_best_deal: 0, // Optional best deal flag
  },
  {
    id: 1,
    name: "Giza Pyramids Tour", // Added name
    main_image: defaultImage,
    title: "Giza Pyramids Tour",
    destination: "Giza",
    duration: "1",
    starRating: 5,
    min_price: 50,
    price: 40, // Added price
    amenities: ["Guide", "Transport"], // Added amenities
    accommodationType: "Hotel", // Added accommodation type
    tour_prices: [{ prices: [{ price: 40 }] }],
    description: "Explore the majestic Giza Pyramids with a guided tour.", // Optional description
    age_range: "All Ages", // Added age range
    language: "English", // Added language
    location: "Giza, Egypt", // Optional location
    rating: 4.8, // Optional rating
    is_best_deal: 1, // Optional best deal flag
  },
  {
    id: 2,
    name: "Nile Cruise", // Added name
    main_image: defaultImage,
    title: "Nile Cruise Adventure",
    destination: "Cairo",
    duration: "3",
    starRating: 4,
    min_price: 150,
    price: 120, // Added price
    amenities: ["Meals", "Entertainment"], // Added amenities
    accommodationType: "Cruise Ship", // Added accommodation type
    tour_prices: [{ prices: [{ price: 120 }] }],
    description: "Enjoy a relaxing cruise on the Nile River.", // Optional description
    age_range: "12 and up", // Added age range
    language: "Arabic", // Added language
    location: "Cairo, Egypt", // Optional location
    rating: 4.5, // Optional rating
    is_best_deal: 0, // Optional best deal flag
  },
  {
    id: 1,
    name: "Giza Pyramids Tour", // Added name
    main_image: defaultImage,
    title: "Giza Pyramids Tour",
    destination: "Giza",
    duration: "1",
    starRating: 5,
    min_price: 50,
    price: 40, // Added price
    amenities: ["Guide", "Transport"], // Added amenities
    accommodationType: "Hotel", // Added accommodation type
    tour_prices: [{ prices: [{ price: 40 }] }],
    description: "Explore the majestic Giza Pyramids with a guided tour.", // Optional description
    age_range: "All Ages", // Added age range
    language: "English", // Added language
    location: "Giza, Egypt", // Optional location
    rating: 4.8, // Optional rating
    is_best_deal: 1, // Optional best deal flag
  },
  {
    id: 2,
    name: "Nile Cruise", // Added name
    main_image: defaultImage,
    title: "Nile Cruise Adventure",
    destination: "Cairo",
    duration: "3",
    starRating: 4,
    min_price: 150,
    price: 120, // Added price
    amenities: ["Meals", "Entertainment"], // Added amenities
    accommodationType: "Cruise Ship", // Added accommodation type
    tour_prices: [{ prices: [{ price: 120 }] }],
    description: "Enjoy a relaxing cruise on the Nile River.", // Optional description
    age_range: "12 and up", // Added age range
    language: "Arabic", // Added language
    location: "Cairo, Egypt", // Optional location
    rating: 4.5, // Optional rating
    is_best_deal: 0, // Optional best deal flag
  },
  {
    id: 1,
    name: "Giza Pyramids Tour", // Added name
    main_image: defaultImage,
    title: "Giza Pyramids Tour",
    destination: "Giza",
    duration: "1",
    starRating: 5,
    min_price: 50,
    price: 40, // Added price
    amenities: ["Guide", "Transport"], // Added amenities
    accommodationType: "Hotel", // Added accommodation type
    tour_prices: [{ prices: [{ price: 40 }] }],
    description: "Explore the majestic Giza Pyramids with a guided tour.", // Optional description
    age_range: "All Ages", // Added age range
    language: "English", // Added language
    location: "Giza, Egypt", // Optional location
    rating: 4.8, // Optional rating
    is_best_deal: 1, // Optional best deal flag
  },
  {
    id: 2,
    name: "Nile Cruise", // Added name
    main_image: defaultImage,
    title: "Nile Cruise Adventure",
    destination: "Cairo",
    duration: "3",
    starRating: 4,
    min_price: 150,
    price: 120, // Added price
    amenities: ["Meals", "Entertainment"], // Added amenities
    accommodationType: "Cruise Ship", // Added accommodation type
    tour_prices: [{ prices: [{ price: 120 }] }],
    description: "Enjoy a relaxing cruise on the Nile River.", // Optional description
    age_range: "12 and up", // Added age range
    language: "Arabic", // Added language
    location: "Cairo, Egypt", // Optional location
    rating: 4.5, // Optional rating
    is_best_deal: 0, // Optional best deal flag
  },
  {
    id: 1,
    name: "Giza Pyramids Tour", // Added name
    main_image: defaultImage,
    title: "Giza Pyramids Tour",
    destination: "Giza",
    duration: "1",
    starRating: 5,
    min_price: 50,
    price: 40, // Added price
    amenities: ["Guide", "Transport"], // Added amenities
    accommodationType: "Hotel", // Added accommodation type
    tour_prices: [{ prices: [{ price: 40 }] }],
    description: "Explore the majestic Giza Pyramids with a guided tour.", // Optional description
    age_range: "All Ages", // Added age range
    language: "English", // Added language
    location: "Giza, Egypt", // Optional location
    rating: 4.8, // Optional rating
    is_best_deal: 1, // Optional best deal flag
  },
  {
    id: 2,
    name: "Nile Cruise", // Added name
    main_image: defaultImage,
    title: "Nile Cruise Adventure",
    destination: "Cairo",
    duration: "3",
    starRating: 4,
    min_price: 150,
    price: 120, // Added price
    amenities: ["Meals", "Entertainment"], // Added amenities
    accommodationType: "Cruise Ship", // Added accommodation type
    tour_prices: [{ prices: [{ price: 120 }] }],
    description: "Enjoy a relaxing cruise on the Nile River.", // Optional description
    age_range: "12 and up", // Added age range
    language: "Arabic", // Added language
    location: "Cairo, Egypt", // Optional location
    rating: 4.5, // Optional rating
    is_best_deal: 0, // Optional best deal flag
  },
  // Add more sample tours here as needed
];

export default function ExcursionsCardTour({ toursData }: ExcursionsProps) {
  // Use sample data if toursData is null or an empty array
  const dataToDisplay =
    toursData === null || toursData.length === 0 ? sampleToursData : toursData;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {dataToDisplay.map((excursion: TourPackage) => (
          <div key={excursion.id} className="px-[5px] md:px-[5px] mb-3">
            <Link href="/top-excursions">
              <div className="px-[4px] mb-3">
                <div className="flex flex-col max-w-lg mx-auto cursor-pointer border hover:border-black border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white h-[500px] transition-all duration-300 ease-in-out">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                      src={excursion.main_image}
                      alt={excursion.title}
                      width={100}
                      height={100}
                    />
                    <div className="absolute top-2 left-2 bg-black text-white text-xs font-segoe font-medium px-2 py-1 rounded">
                      Top Rated
                    </div>
                    <Button className="absolute top-2 right-2 text-white hover:text-red-500">
                      <BsHeart size={24} />
                    </Button>
                  </div>
                  <div className="flex flex-col flex-grow px-4 py-4">
                    <div className="flex items-center text-gray-600 text-sm mb-2 font-segoe">
                      <BsMap size={16} className="mr-1" />
                      <span className="font-segoe">
                        {excursion.destination}
                      </span>
                    </div>
                    <h2 className="font-segoe text-xl mb-2 truncate">
                      {excursion.title}
                    </h2>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <BsClock size={16} className="mr-1" />
                      <span>{excursion.duration} days</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {[...Array(excursion.starRating)].map((_, index) => (
                            <BsFillCircleFill
                              key={index}
                              className="text-green-500 w-4 h-4 ml-1"
                            />
                          ))}
                          <span className="m-2 text-gray-600 text-sm">
                            {excursion.starRating} stars
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="line-through text-gray-500">
                        From ${excursion.min_price}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="font-segoe text-xl text-black">
                        From $
                        {excursion.tour_prices[0]?.prices[0]?.price || "N/A"}
                      </span>
                      <span className="text-gray-600 text-sm"> / Person</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

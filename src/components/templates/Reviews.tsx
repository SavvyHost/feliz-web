import React from "react";
import Image from "next/image";
import User from "../../../public/assets/infocard.png";
import { FaStar } from "react-icons/fa"; // Import the star icon
import { Button } from "@mui/material";
import { reviews } from "@/data";

// Define the review item type
interface Review {
  name: string;
  username: string;
  date: string;
  content: string;
  rating: number; // Number of stars to show
}

// Sample review data

const Reviews = () => {
  return (
    <div>
      <h2 className="text-3xl font-segoe text-start mt-9 mb-6">Reviews</h2>
      <div className="p-4">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-start mb-6">
            <Image
              src={User}
              alt="Profile picture"
              width={48}
              height={48}
              className="rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex flex-col">
                <h3 className="font-bold text-black">{review.name}</h3>
                <div className="flex text-gray-500">
                  <span>{review.username}</span>
                  <span className="mx-2">•</span>
                  <span>{review.date}</span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <FaStar key={i + review.rating} className="text-gray-300" />
                ))}
              </div>
              <p className="mt-2 text-gray-800">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button className="flex items-center capitalize px-4 py-2 border border-opacity-60 border-yellow-700 bg-yellow-100 text-[#A16207] font-segoe text-lg rounded-md hover:bg-[#8a4c03] hover:text-white transition-colors duration-300">
          View More Details
        </Button>
      </div>
    </div>
  );
};

export default Reviews;

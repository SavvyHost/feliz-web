import React from "react";
import { Button } from "@mui/material";
import { BsLuggageFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";
import Link from "next/link";

export default function BluerForm() {
  return (
    <div className="absolute top-1/2 sm:left-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-full w-4/5 max-w-sm p-4 backdrop-blur-md bg-white/30 rounded-md">
      <div className="py-4 px-2">
        <p className="text-start text-md text-white mb-4">
          Explore the best of Egypt adventure
        </p>

        <form className="space-y-3 relative">
          <div className="flex flex-row space-x-2 mb-3">
            {/* Link for Tour Package */}
            <Link href="/top-packages/" className="relative flex-1">
              <BsLuggageFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
              <input
                type="text"
                placeholder="Tour Package"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 text-sm cursor-pointer"
                readOnly
              />
            </Link>

            {/* Link for Excursions */}
            <Link href="/top-excursions/" className="relative flex-1">
              <FaBus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
              <input
                type="text"
                placeholder="Excursions"
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 text-sm cursor-pointer"
                readOnly
              />
            </Link>
          </div>

          <div className="relative mb-3">
            <select className="w-full px-3 py-2 border border-[#FFF3C5] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
              <option value="Luxor">Luxor</option>
              <option value="Hurghada">Hurghada</option>
              <option value="Sharm">Sharm</option>
              <option value="Marsa alam">Marsa alam</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <Button className="w-full capitalize sm:w-auto py-2 text-white px-3 bg-red-600 font-segoe rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

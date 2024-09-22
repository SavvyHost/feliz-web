import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import InquireImage from "../../../public/assets/firstImage.jpeg";
type Props = {};

const Inquire = (props: Props) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  return (
    <>
      <div className="font-sans max-w-6xl mx-auto bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden mt-28 mb-6 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section: Image */}
          <div className="flex items-center justify-center">
            <Image
              src={InquireImage}
              className="w-full h-full max-w-xs md:max-w-3xl object-cover"
              alt="Contact Us"
              width={400} // Set suitable width
              height={400}
            />
          </div>

          {/* Right Section: Form */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl text-yellow-600  text-center mb-8 capitalize font-segoe">
              Tell us about the travelers
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full bg-gray-100 rounded-lg py-3 px-4 text-sm outline-yellow-600 focus:bg-white"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full bg-gray-100 rounded-lg py-3 px-4 text-sm outline-yellow-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select className="w-full bg-gray-100 rounded-lg py-3 px-4 text-sm outline-yellow-600 focus:bg-white">
                  <option value="" disabled selected>
                    Select your Nationality *
                  </option>
                  {/* Add options here */}
                </select>
                <div className="flex gap-6">
                  <select className="w-1/3 bg-gray-100 rounded-lg py-3 px-4 text-sm outline-yellow-600 focus:bg-white">
                    <option value="" disabled selected>
                      Code
                    </option>
                    {/* Add options here */}
                  </select>
                  <input
                    type="tel"
                    placeholder="Mobile *"
                    className="w-2/3 bg-gray-100 rounded-lg py-3 px-4 text-sm outline-yellow-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between  p-1">
                  <label className="text-xs">Adults (+12)</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(adults - 1, 0))}
                      className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center text-lg"
                    >
                      -
                    </button>
                    <span className="mx-3 text-xs font-medium">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between  p-1">
                  <label className="text-xs">Children (2 to 11)</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(children - 1, 0))}
                      className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center text-lg"
                    >
                      -
                    </button>
                    <span className="mx-3 text-xs font-medium">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between  p-1">
                  <label className="text-xs">Infants (0 to 2)</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setInfants(Math.max(infants - 1, 0))}
                      className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center text-lg"
                    >
                      -
                    </button>
                    <span className="mx-3 text-xs font-medium">{infants}</span>
                    <button
                      type="button"
                      onClick={() => setInfants(infants + 1)}
                      className="bg-gray-200 rounded w-8 h-8 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <select className="w-full bg-gray-100 rounded-lg py-3 px-4 text-xs outline-yellow-600 focus:bg-white">
                  <option value="" disabled selected>
                    Your average budget per person
                  </option>
                  {/* Add options here */}
                </select>
                <small className="block text-sm mt-2 text-gray-500">
                  Per person (international flights NOT included)
                </small>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="flightOffer" className="mr-2" />
                <label htmlFor="flightOffer" className="text-sm">
                  Add flight offer to your vacation package
                </label>
              </div>

              <textarea
                placeholder="Additional Info"
                rows={4}
                className="w-full bg-gray-100 rounded-lg px-4 text-sm pt-3 outline-yellow-600 focus:bg-white"
              />

              <Button className="text-white capitalize font-segoe w-full bg-custom-gradient hover:bg-yellow-700 rounded-lg text-sm px-6 py-3 mt-6">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inquire;

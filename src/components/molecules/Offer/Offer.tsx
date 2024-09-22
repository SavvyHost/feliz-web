import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";

// Define the types for the props
type OfferProps = {
  imageSrc: StaticImageData;
  title: string;
  description: string;
  linkHref: string;
  price: string;
  discount: string;
  originalPrice: string;
  expirationDate: string;
};

export default function Offer({
  imageSrc,
  title,
  description,
  linkHref,
  price,
  discount,
  originalPrice,
  expirationDate,
}: OfferProps) {
  return (
    <div
      className="relative rounded-md overflow-hidden bg-cover bg-center shadow-md font-segoe"
      style={{ height: "300px" }}
    >
      {/* Image */}
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-6">
        {/* Header */}
        <div className="text-white">
          <h2 className="text-2xl">{title}</h2>
          <div className="justify-between flex">
            <h3 className="text-lg">{description}</h3>
            Ends in {expirationDate}
          </div>

          <div>
            <span className="line-through text-red-500">{originalPrice}</span>
            <span className="ml-2">{discount}</span>

            <div className="text-xl font-bold">{price}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white font-segoe">
          <div className="flex justify-between items-center"></div>
        </div>
      </div>

      {/* Button */}
      <div className="absolute bottom-20 left-6">
        <Button
          variant="contained"
          color="primary"
          href={linkHref}
          style={{ backgroundColor: "transparent", border: "1px solid white" }} // Custom color
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
}

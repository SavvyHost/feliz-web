import React from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  subtitle: string;
  imageUrl: StaticImageData;
};

const HeroBannerAttraction: React.FC<Props> = ({
  title,
  subtitle,
  imageUrl,
}) => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
        <h1 className="text-4xl md:text-5xl lg:text-3xl font-segoe text-center mb-4">
          {title}
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-4xl font-segoe text-center">
          {subtitle}
        </h2>
      </div>
    </div>
  );
};

export default HeroBannerAttraction;

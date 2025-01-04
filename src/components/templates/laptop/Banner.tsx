import Image, { StaticImageData } from "next/image";
import React from "react";
import ImageBanner from "../../../../public/assets/banner.jpg";

interface BannerProps {
  overlayText?: string;
  backgroundImage?: string | StaticImageData;
}

const Banner: React.FC<BannerProps> = ({
  overlayText = "Welcome to Our Experience",
  backgroundImage = ImageBanner,
}) => {
  return (
    <div className="relative mt-[45px] h-[350px] w-full overflow-hidden ">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Banner Image"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Overlay Text */}
      {overlayText && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4"
            style={{
              textShadow:
                "0 0 2px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.3), 0 0 6px rgba(255,255,255,0.2)",
            }}
          >
            {overlayText}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Banner;

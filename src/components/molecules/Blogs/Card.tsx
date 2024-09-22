import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import DefaultImage from "../../../../public/assets/pyr.jpeg";

interface CardProps {
  imageSrc: string | StaticImageData;
  title: string;
  content: string;
  created_at: string;
  id: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  content,
  created_at,
  id,
}) => {
  // Fallback to default image if imageSrc is undefined, null, or an empty string
  const imageToUse = imageSrc && imageSrc !== "" ? imageSrc : DefaultImage;

  return (
    <div className="flex-shrink-0 max-w-md mx-2 rounded-sm overflow-hidden shadow-lg bg-[#FAFAFA]">
      <Link href={`/blogs/${id}`}>
        <div className="relative">
          <Image
            src={imageToUse}
            alt={title}
            width={512}
            height={320}
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-0 left-0 font-segoe right-0 h-28 lg:h-20 bg-white/30 backdrop-blur-md">
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h2 className="text-base md:text-xl font-sego">{title}</h2>
              {/* <p className="text-sm">{content}</p> */}
              <p className="text-xs">
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;

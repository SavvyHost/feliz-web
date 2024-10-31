import React, { useEffect, useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import defaultImage from "../../../public/assets/camels.jpeg";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

interface AttractionCardProps {
  id: number;
  title: string;
  location?: string;
  price: number;
  image: StaticImageData;
  rating: number;
  duration: string;
  ageRange: string;
  isFeatured?: boolean;
  isOnSale?: boolean;
}

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<AttractionCardProps[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        } else {
          throw new Error("Invalid wishlist format");
        }
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      localStorage.removeItem("wishlist");
      setWishlist([]);
    }
  };

  const saveWishlist = (newWishlist: AttractionCardProps[]) => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const toggleWishlist = (attraction: AttractionCardProps) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === attraction.id);
      const newWishlist = isInWishlist
        ? prev.filter((item) => item.id !== attraction.id)
        : [...prev, { ...attraction }];

      saveWishlist(newWishlist);
      return newWishlist;
    });
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return { wishlist, toggleWishlist, isInWishlist };
};

const AttractionCard: React.FC<AttractionCardProps> = ({
  id,
  title,
  location,
  price,
  image,
  rating,
  duration,
  ageRange,
  isFeatured = false,
  isOnSale = true,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (startPos.current) {
      const dx = Math.abs(e.clientX - startPos.current.x);
      const dy = Math.abs(e.clientY - startPos.current.y);

      if (dx < 5 && dy < 5) {
        const target = e.target as HTMLElement;
        if (!target.closest("button")) {
          handleNavigate();
        }
      }
    }
    startPos.current = null;
  };

  const handleNavigate = () => {
    router.push(`/top-packages/${id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    window.location.reload();
    e.preventDefault();
    e.stopPropagation();

    const attraction = {
      id,
      title,
      location,
      price,
      image,
      rating,
      duration,
      ageRange,
      isFeatured,
      isOnSale,
    };

    toggleWishlist(attraction);
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="flex group transition-all ease-in-out flex-col cursor-pointer overflow-hidden bg-transparent md:max-w-xs max-w-sm sm:mx-2 mx-3 my-2 sm:my-4 lg:my-6"
    >
      <div className="relative h-60 w-full transition-shadow duration-300 group-hover:shadow-xl">
        {" "}
        {/* Apply shadow on hover here */}
        <Image
          src={image || defaultImage}
          width={0}
          height={0}
          alt={title}
          className="w-full rounded-md h-full object-cover"
        />
      </div>
      <div className="absolute top-7 right-4 z-10">
        <button
          onClick={handleWishlistClick}
          className="p-2 rounded-full  hover:bg-white transition-colors duration-200"
          aria-label={
            isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          {isInWishlist(id) ? (
            <FaHeart className="text-red-500 w-6 h-6" />
          ) : (
            <FaRegHeart className="text-black w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex-1 pt-3 flex flex-col h-72">
        <h3 className="font-semibold text-lg font-segoe text-black mb-1 truncate group-hover:underline">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 font-segoe">{location}</p>

        {/* Display rating as stars */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }, (_, index) =>
            index < rating ? (
              <FaStar key={index} className="text-yellow-400" />
            ) : (
              <FaRegStar key={index} className="text-gray-300" />
            )
          )}
        </div>

        {/* Display duration */}
        <p className="text-gray-600 text-sm mb-2">Duration: {duration} days</p>

        {/* Display age range */}
        <p className="text-gray-600 text-sm mb-2">Age Range: {ageRange}</p>

        <div className="mt-auto text-left">
          <p className="text-black font-semibold text-lg font-segoe">
            From ${price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;

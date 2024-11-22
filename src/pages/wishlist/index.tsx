import React, { useState } from "react";
import Image from "next/image";
import EMPTY from "../../../public/assets/payment-error.png";
import AttractionCard from "@/components/templates/AttractionCard";
import Link from "next/link";
import { useWishlist } from "@/contexts/wishlist-context";
import { FaTrash } from "react-icons/fa";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, wishlistCount } = useWishlist();
  const [isEditMode, setIsEditMode] = useState(false);

  // No need for separate loading state as context handles initialization
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-9 mt-16 py-8">
        <h1 className="text-2xl font-bold text-left text-red font-segoe sm:font-semi-bold md:text-special-offer my-8">
          My Wishlist
        </h1>

        <div className="container mx-auto px-9 mt-3 py-2 flex flex-col items-center text-center">
          <Image
            src={EMPTY}
            width={300}
            height={300}
            className="w-60 h-60 mb-6"
            alt="Empty wishlist"
            priority
          />

          <p className="text-gray-600 max-w-md">
            Your wishlist is empty. Browse our attractions to add some!{" "}
            <Link href="/" className="text-blue-500 underline">
              Discover More
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-9 mt-16 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-left text-red font-segoe sm:font-semi-bold md:text-special-offer">
          My Wishlist ({wishlistCount} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((attraction) => (
          <div key={attraction.id} className="relative">
            <AttractionCard {...attraction} isEditMode={isEditMode} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

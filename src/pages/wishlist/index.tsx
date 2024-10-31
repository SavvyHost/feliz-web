// WishlistPage.tsx
import AttractionCard from "@/components/templates/AttractionCard";
import React, { useEffect, useState } from "react";
import { StaticImageData } from "next/image";

interface WishlistItem {
  id: number;
  title: string;
  location?: string;
  price: number;
  image: StaticImageData;
  rating: number;
  duration: string;
  ageRange: string;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWishlistItems();
  }, []);

  const loadWishlistItems = () => {
    setIsLoading(true);
    setError(null);

    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          setWishlistItems(parsed);
        } else {
          throw new Error("Invalid wishlist data format");
        }
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      setError("Unable to load wishlist. Please try refreshing the page.");
      localStorage.removeItem("wishlist");
      setWishlistItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-9 mt-16 py-8">
        <h1 className="text-2xl font-bold text-left text-red font-segoe sm:font-semi-bold md:text-special-offer my-8">
          My Wishlist
        </h1>
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-9 mt-16 py-8">
        <h1 className="text-2xl font-bold text-left text-red font-segoe sm:font-semi-bold md:text-special-offer my-8">
          My Wishlist
        </h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-9 mt-16 py-8">
        <h1 className="text-2xl font-bold text-left text-red font-segoe sm:font-semi-bold md:text-special-offer my-8">
          My Wishlist
        </h1>
        <p className="text-gray-600">
          Your wishlist is empty. Browse our attractions to add some!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-9 mt-16 py-8">
      <h1 className="text-2xl font-bold text-left text-red font-segoe sm:font-semi-bold md:text-special-offer my-8">
        My Wishlist
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((attraction) => (
          <AttractionCard key={attraction.id} {...attraction} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

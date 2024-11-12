import React, { createContext, useContext, useState, useEffect } from "react";
import { AttractionCardProps } from "../types/attraction";
import { notify } from "@/utils/toast";

interface WishlistContextType {
  wishlist: AttractionCardProps[];
  toggleWishlist: (attraction: AttractionCardProps) => void;
  isInWishlist: (id: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<AttractionCardProps[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    if (typeof window !== "undefined") {
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
        notify("error", "Failed to load wishlist");
      }
    }
  };

  const saveWishlist = (newWishlist: AttractionCardProps[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      } catch (error) {
        console.error("Error saving wishlist:", error);
        notify("error", "Failed to save wishlist");
      }
    }
  };

  const toggleWishlist = (attraction: AttractionCardProps) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((item) => item.id === attraction.id);
      const newWishlist = isInWishlist
        ? prev.filter((item) => item.id !== attraction.id)
        : [...prev, { ...attraction }];

      // Show notification based on add/remove action using our custom notify
      if (isInWishlist) {
        notify("info", `${attraction.title} removed from wishlist`);
      } else {
        notify("success", `${attraction.title} added to wishlist`);
      }

      saveWishlist(newWishlist);
      return newWishlist;
    });
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

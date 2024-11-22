import React, { createContext, useContext, useState, useEffect } from "react";
import { AttractionCardProps } from "@/types/attraction"; // Update the path as per your project

interface RecentlyViewedContextType {
  recentlyViewed: AttractionCardProps[];
  addToRecentlyViewed: (attraction: AttractionCardProps) => void;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

export const RecentlyViewedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<AttractionCardProps[]>(
    []
  );

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = () => {
    if (typeof window !== "undefined") {
      try {
        const savedRecentlyViewed = localStorage.getItem("recentlyViewed");
        if (savedRecentlyViewed) {
          const parsed = JSON.parse(
            savedRecentlyViewed
          ) as AttractionCardProps[];
          if (Array.isArray(parsed)) {
            setRecentlyViewed(parsed);
          } else {
            throw new Error("Invalid recently viewed format");
          }
        }
      } catch (error) {
        console.error("Error loading recently viewed:", error);
        localStorage.removeItem("recentlyViewed");
        setRecentlyViewed([]);
      }
    }
  };

  const saveRecentlyViewed = (newRecentlyViewed: AttractionCardProps[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify(newRecentlyViewed)
        );
      } catch (error) {
        console.error("Error saving recently viewed:", error);
      }
    }
  };

  const addToRecentlyViewed = (attraction: AttractionCardProps) => {
    setRecentlyViewed((prev) => {
      const isAlreadyViewed = prev.some((item) => item.id === attraction.id);

      // Add only if not already viewed
      const newRecentlyViewed = isAlreadyViewed
        ? prev
        : [attraction, ...prev.slice(0, 4)]; // Limit to the last 5 items

      saveRecentlyViewed(newRecentlyViewed);
      return newRecentlyViewed;
    });
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = (): RecentlyViewedContextType => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }
  return context;
};

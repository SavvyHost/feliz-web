// types/tour.ts

import { StaticImageData } from "next/image";

export interface TourPackage {
  id: number;
  name: string;
  title: string;
  destination: string;
  price: number;
  starRating: number;
  amenities: string[];
  main_image: StaticImageData;
  accommodationType: string;
  tour_prices: any;
  description?: string;
  duration: string;
  age_range: string;
  language: string;
  min_price: number;
  location?: string; // Optional property
  rating?: number; // Optional property
  is_best_deal?: number; // Optional property
  // Add any other properties that are used in the components
}

export interface PricePlan {
  name: string;
  price: string;
}

export interface PricePlanDetail {
  title: string;
  from_month: string;
  to_month: string;
  prices: PricePlan[];
}

export interface TourIncludeItem {
  status: "yes" | "no"; // or use boolean if you prefer
  title: string;
  description: string;
}

export interface TourItineraryItem {
  title: string;
  description: string;
  duration: string;
}

export interface TourDetail extends TourPackage {
  tags?: string[]; // Optional property
  min_price: number;
  description: string;
  images: string[];
  num_of_cities?: number;
  num_of_places?: number;
  category?: {
    name?: string;
  };
  run?: string;
  transportation_mode: string;
  tour_prices: PricePlanDetail[]; // Ensure this is always an array
  tour_includes?: TourIncludeItem[]; // Adjusted to match the component's usage
  tour_itineraries?: TourItineraryItem[]; // Added to match the component's usage
  tour_frequently_questions?: {
    question: string;
    answer: string;
  }[];
}

// Update ToursData to reflect that it includes `data` property
export interface ToursData {
  data: TourPackage[];
}
export type PostedData_TP = "json" | "formData";

const postMethods_TP = {
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  get: "GET",
} as const;

/* 
upload
*/
// custom file type
export interface CFile_TP extends File {
  src: string;
  preview: string;
  id: string;
}

export type SelectOption_TP = {
  id?: string | number;
  value: string;
  label: string;
  name?: string;
};

/* every email type */
// I think i can do better
export type Email_TP = `${string}@${string}.${string}`;

/* 
SYSTEM ESTABLISHMENT
*/
export type Units_TP = {
  id: string;
  value: string;
  size_id: string;
};
export type CategoryMainData_TP = {
  id: string | number;
  name: string;
  has_size: boolean;
  has_selsal: boolean;
  type: "multi" | "single";
  selling_type: "part" | "all";
  sizes?: CategorySize_TP[];
};

export type CategorySize_TP = {
  id: string;
  units: Units_TP[];
  type: string;
  start: string;
  end: string;
  increase: string;
  category_name: string;
};
export interface Category_TP extends CategoryMainData_TP {
  items?: CategoryMainData_TP[];
}

/* 
// globals
*/

export type SetState_TP<T> = React.Dispatch<React.SetStateAction<T>>;

export type Column_TP<AccessorTP> = {
  header: string;
  accessorKey?: AccessorTP;
  Cell?: unknown;
  filterKey?: any;

  // id?: string,
  // Filter?: unknown,
  // dataType?: string,
  // disableFilters?: boolean,
};

export type KaratValues_TP = "24" | "22" | "21" | "18";

export type Attraction = {
  id: number;
  name: string;
  city_id: number;
  longitude: string;
  latitude: string;
  images: string[]; // Assuming the API returns an array of image URLs
  paner_image: {
    url: string;
  } | null;
  toursCount?: number; // Optional field if available in the API
};

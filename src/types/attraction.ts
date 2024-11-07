import { StaticImageData } from "next/image";

export interface AttractionCardProps {
  name: any;
  id: string;
  title: string;
  location: string;
  price: number;
  image: StaticImageData;
  rating: number;
  duration: number;
  ageRange: string;
  isFeatured?: boolean;
  isOnSale?: boolean;
  age_range: string;
  run: string;
  min_price: number;
  main_image: {
    url: string;
  } | null;
  destination: string;
}

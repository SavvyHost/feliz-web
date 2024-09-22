import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "./Card";
import BlogImage from "../../../../public/assets/firstImage.jpeg";
import { StaticImageData } from "next/image";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  autoplaySpeed: 3000,
  centerMode: true,
};

// Define static fallback data
const staticBlogData = {
  data: [
    {
      id: 1,
      title: "How to Travel on a Budget",
      content: "Tips and tricks to save money while exploring the world.",
      created_at: "2023-09-10",
      image: BlogImage,
    },
    {
      id: 2,
      title: "Top Destinations for 2024",
      content: "Discover the hottest travel spots for the upcoming year.",
      created_at: "2023-09-12",
      image: BlogImage,
    },
    {
      id: 3,
      title: "Packing Essentials for Every Traveler",
      content: "Don't forget these must-have items on your next trip.",
      created_at: "2023-09-15",
      image: BlogImage,
    },
  ],
};

type BlogData = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string | StaticImageData;
};

type Props = {
  blogData?: BlogData[] | { data?: BlogData[] };
};

const Blog: React.FC<Props> = ({ blogData }) => {
  // Ensure that blogData is always an array, either directly or within `data`.
  const dataToShow = Array.isArray(blogData)
    ? blogData
    : blogData?.data?.length
    ? blogData.data
    : staticBlogData.data;

  return (
    <div className="p-0">
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 justify-center mx-auto max-w-screen-xl">
        {dataToShow.map((blog) => (
          <Card
            key={blog.id}
            imageSrc={blog.image}
            title={blog.title}
            content={blog.content}
            created_at={blog.created_at}
            id={blog.id.toString()}
          />
        ))}
      </div>

      <div className="block md:hidden">
        <Slider {...sliderSettings}>
          {dataToShow.map((blog) => (
            <div key={blog.id} className="px-0">
              <Card
                imageSrc={blog.image}
                title={blog.title}
                content={blog.content}
                created_at={blog.created_at}
                id={blog.id.toString()}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Blog;

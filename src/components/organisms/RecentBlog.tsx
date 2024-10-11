import React, { useState } from "react";
import { Calendar, Globe, Heart, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import MAinImage from "../../../public/assets/Secondimage.jpeg";

// Define the types
interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  main_image: {
    url: string;
  } | null;
}

const staticBlogData: BlogPost[] = [
  {
    id: 1,
    title: "Exploring the Beauty of the Alaskan Wilderness",
    author: "John Doe",
    date: "September 12, 2024",
    category: "Travel",
    main_image: {
      url: MAinImage,
    },
  },
];

const RecentBlog = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const blogsPerPage = 6;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const indexOfLastBlog = (currentPage + 1) * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = staticBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
  const pageCount = Math.ceil(staticBlogData.length / blogsPerPage);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-3">
        {currentBlogs.map((post) => (
          <Link href={`/blogs/${post.id}`} key={post.id}>
            <div className="w-full hover:border-blue-500 bg-white  border-gray-300 border overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer">
              {/* Card layout for mobile */}
              <div className="flex flex-row md:hidden">
                <div className="w-1/3 h-32 sm:h-40 relative">
                  <Image
                    src={post?.main_image?.url || "/path/to/default/image.jpg"}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-segoe  shadow-md">
                    Featured
                  </div>
                  <button className="absolute top-2 right-2 bg-white p-1  shadow-md hover:bg-gray-100 transition-colors duration-200 group">
                    <Heart className="w-4 h-4 text-gray-600 group-hover:text-blue-500" />
                  </button>
                </div>

                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mb-1 text-gray-800 truncate">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-600">
                      {post.author} • {post.date}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-xs text-gray-600">
                        Category: {post.category}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-black text-white text-xs py-1 px-3 rounded-sm hover:bg-gray-800">
                        Read More
                      </Button>
                      <Button className="bg-green-300 text-green-900 text-xs py-1 px-3 rounded-sm hover:bg-green-400 flex items-center">
                        <FaWhatsapp className="mr-1" size={12} />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card layout for desktop */}
              <div className="hidden md:flex md:flex-row">
                <div className="w-2/5 h-auto relative">
                  <Image
                    src={post?.main_image?.url || "/path/to/default/image.jpg"}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 text-sm font-segoe rounded-sm shadow-md">
                    Featured Article
                  </div>
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 group">
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
                  </button>
                </div>

                <div className="w-3/5 p-5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.author} • {post.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {post.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-left mt-2">
                      <Button className="bg-black text-white text-xs py-2 px-4 rounded-md hover:bg-gray-800">
                        Read More
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-green-300 text-green-900 text-xs py-2 px-4 rounded-md hover:bg-green-400 flex items-center">
                        <FaWhatsapp className="mr-2" size={16} />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentBlog;

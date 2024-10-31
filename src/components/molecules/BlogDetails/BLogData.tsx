import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";

type DetailBlogsType = {
  content: string;
};

type BlogDataProps = {
  DetailBlogs: DetailBlogsType;
};

const BlogData: React.FC<BlogDataProps> = ({ DetailBlogs }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize((prevSize) => prevSize - 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for mobile */}
        <div className="md:hidden fixed top-16 right-0 w-full z-10 bg-white p-4 rounded shadow-md">
          <SidebarContent
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
          />
        </div>

        {/* Sidebar for desktop - with content-specific positioning */}
        <div className="hidden md:block w-16">
          <div className="h-full">
            <div className="sticky top-24 pt-4">
              <SidebarContent
                increaseFontSize={increaseFontSize}
                decreaseFontSize={decreaseFontSize}
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-8">
          <div className="min-h-[800px]">
            {" "}
            <p
              className="text-gray-700"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: DetailBlogs?.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<{
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}> = ({ increaseFontSize, decreaseFontSize }) => (
  <div className="flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-6">
    {/* Zoom controls */}
    <div className="flex md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2 bg-gray-100 p-2 rounded-lg">
      <button
        onClick={increaseFontSize}
        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
      >
        <ZoomIn size={20} />
      </button>
      <span className="text-sm font-bold">Aa</span>
      <button
        onClick={decreaseFontSize}
        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
      >
        <ZoomOut size={20} />
      </button>
    </div>

    {/* Social sharing */}
    <div className="flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4">
      <Share2 size={20} className="text-gray-500" />
      <Facebook
        size={20}
        className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
      />
      <Twitter
        size={20}
        className="text-blue-400 hover:text-blue-500 cursor-pointer transition-colors"
      />
      <Linkedin
        size={20}
        className="text-blue-700 hover:text-blue-800 cursor-pointer transition-colors"
      />
      <Instagram
        size={20}
        className="text-pink-600 hover:text-pink-700 cursor-pointer transition-colors"
      />
      <Mail
        size={20}
        className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors"
      />
    </div>
  </div>
);

export default BlogData;

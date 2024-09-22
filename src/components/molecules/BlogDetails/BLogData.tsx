// src/components/molecules/BlogDetails/BLogData.tsx
import React from "react";

// Define the type for DetailBlogs
type DetailBlogsType = {
  content: string;
};

// Define the props type for BlogData
type BlogDataProps = {
  DetailBlogs: DetailBlogsType;
};

// Define the BlogData component
const BlogData: React.FC<BlogDataProps> = ({ DetailBlogs }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: DetailBlogs?.content }}
        />
      </div>
    </div>
  );
};

export default BlogData;

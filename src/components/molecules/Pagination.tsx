// components/Pagination.tsx
import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons from lucide-react

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6 ">
      <ReactPaginate
        previousLabel={
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-md">
            <ChevronLeft className="w-4 h-4 text-white" />
          </span>
        }
        nextLabel={
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-md">
            <ChevronRight className="w-4 h-4 text-white" />
          </span>
        }
        breakLabel={
          <span className="inline-block px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700">
            ...
          </span>
        }
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={"flex space-x-1"}
        pageClassName={
          "inline-flex items-center  justify-center px-3 py-1 bg-green-500 border border-gray-300 rounded-md text-gray-700"
        }
        pageLinkClassName={"cursor-pointer"}
        previousClassName={
          "inline-flex items-center justify-center px-3 py-1 bg-green-500 border border-gray-300 rounded-md text-gray-700"
        }
        nextClassName={
          "inline-flex items-center justify-center px-3 py-1 bg-green-500 border border-gray-300 rounded-md text-gray-700"
        }
        breakClassName={
          "inline-flex items-center justify-center px-3 py-1 bg-green-500 border border-gray-300 rounded-md text-gray-700"
        }
        activeClassName={"bg-blue-500 text-white"}
        disabledClassName={"bg-gray-200 text-gray-400 cursor-not-allowed"}
      />
    </div>
  );
};

export default Pagination;

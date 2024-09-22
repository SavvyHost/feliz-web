import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  setIsModalOpen: (open: boolean) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ setIsModalOpen }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search For a tour or Activity"
        className="w-full p-4 pl-12 bg-white text-gray-400 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/30"
        onClick={() => setIsModalOpen(true)}
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
    </div>
  );
};

export default SearchInput;

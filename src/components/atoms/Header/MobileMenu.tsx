// MobileMenu.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CiGlobe } from "react-icons/ci";
import { AiOutlineLogin, AiOutlineSearch } from "react-icons/ai"; // Import icons

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: () => void;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onLanguageChange,
}) => {
  const router = useRouter();

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 bg-white p-6 w-[100%] max-w-full mx-auto rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-[#945E13] focus:outline-none"
        onClick={onClose}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <ul className="flex flex-col items-center gap-y-4 mt-12">
        {[
          "Explore",
          "Top Packages",
          "Top Excursions",
          "Nile Cruises",
          "Blogs",
        ].map((item) => (
          <li key={item} onClick={onClose}>
            <Link
              href={
                item === "Explore"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className={`block font-segoe font-semibold text-[14px] px-3 py-1 rounded ${
                router.pathname === `/${item.toLowerCase().replace(" ", "-")}`
                  ? "bg-[#e6af62] text-white"
                  : "text-[#945E13] hover:bg-[#f0e6d6] hover:text-[#e6af62]"
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/login" className="flex items-center justify-center mt-4">
        <AiOutlineLogin size={30} className="text-[#945E13]" />
        <span className="ml-2">Login</span>
      </Link>
      <div className="flex items-center justify-center mt-8">
        <button
          className="text-black focus:outline-none"
          onClick={onLanguageChange}
          title="Change Language"
        >
          <CiGlobe size={30} />
        </button>
      </div>

      {/* Login Button */}

      {/* Search Button */}
      {/* <button className="flex items-center justify-center mt-4" title="Search">
        <AiOutlineSearch size={30} className="text-[#945E13]" />
      </button> */}
    </div>
  );
};

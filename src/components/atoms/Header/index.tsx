import { useState, useEffect } from "react";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";
import {
  AiOutlineLogin,
  AiOutlineMenuFold,
  AiOutlineSearch,
} from "react-icons/ai"; // Import login and search icons
import { MobileMenu } from "./MobileMenu";
import { useRouter } from "next/router";

type HeaderProps_TP = {
  header: string;
  className?: string;
};

export const Header = ({ header, className }: HeaderProps_TP) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        setIsScrolled(false);
        setIsFixed(true);
      } else {
        setIsScrolled(true);
      }

      if (window.innerWidth >= 1024) {
        let lastScrollTop = 0;
        if (scrollTop > lastScrollTop) {
          setIsFixed(false);
        } else if (scrollTop < lastScrollTop || scrollTop === 0) {
          setIsFixed(true);
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = () => {
    alert("Language change button clicked!");
  };

  return (
    <>
      <header
        className={`${
          isFixed ? "fixed" : "relative"
        } bg-white shadow-md top-0 w-full font-sans tracking-wide z-40 sm:px-16 px-4 transition-transform duration-500 ease-in-out transform ${
          isFixed ? "translate-y-0" : "-translate-y-full"
        } ${className}`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Logo */}
          <Link href="/" className="p-6">
            <div className="text-nowrap">Egypt Raisen Tours</div>
          </Link>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <ul className="flex flex-col mr-12 items-center gap-y-4 lg:flex-row lg:gap-x-0 lg:space-y-0">
              {[
                { href: "/", label: "Home" },
                { href: "/top-packages", label: "Tour Packages" },
                { href: "/top-excursions", label: "Short Excursions" },
                { href: "/nile-cruises", label: "Nile Cruises" },
                { href: "/blogs", label: "Blogs" },
              ].map(({ href, label }) => (
                <Link href={href} key={href}>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-segoe font-semibold text-nowrap text-[14px] px-3 py-1 rounded transition-colors duration-300 ${
                      router.pathname === href
                        ? "text-gray-600"
                        : "text-black hover:text-gray-300"
                    }`}
                  >
                    {label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center justify-end space-x-6">
            {/* Earth Icon for Language Change - hidden on mobile */}
            <button
              className="hidden lg:block focus:outline-none"
              onClick={handleLanguageChange}
              title="Change Language"
            >
              <CiGlobe size={30} />
            </button>

            {/* Search Button - hidden on mobile */}
            <button
              className="hidden lg:block focus:outline-none"
              title="Search"
            >
              <AiOutlineSearch size={30} className="text-black" />
            </button>

            {/* Login Button - hidden on mobile */}
            <Link href="/login" className="hidden lg:flex items-center">
              <span className="ml-2 bg-black p-2 rounded-md px-10 text-white">
                Login
              </span>
            </Link>

            {/* Mobile Menu Button (Visible on Mobile Only) */}
            <button
              className="lg:hidden text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AiOutlineMenuFold size={30} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
};

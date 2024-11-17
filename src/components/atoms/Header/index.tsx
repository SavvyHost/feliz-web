import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Globe, Menu, Heart } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { useRouter } from "next/router";
import { useWishlist } from "@/contexts/wishlist-context";
import Image from "next/image";
import LOGO from "../../../../public/assets/felizlogo.png";

export const Header = ({ header, className }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (!isDesktop) return;

    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, isDesktop]);

  const handleLanguageChange = () => {
    alert("Language change button clicked!");
  };

  const handleWishlistClick = () => {
    router.push("/wishlist");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/top-packages", label: "Tour Packages" },
    { href: "/top-excursions", label: "Short Excursions" },
    { href: "/nile-cruises", label: "Nile Cruises" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 px-4 sm:px-16 bg-white shadow-md transition-transform duration-300 ${
          isDesktop && !visible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between ">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-custom-darkblue focus:outline-none"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 -translate-x-8 lg:-translate-x-0">
            <Link href="/" className="block">
              <div className="relative w-40 lg:h-20 h-16">
                <Image
                  src={LOGO}
                  alt="Feliz Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:w-2/3 justify-center">
            <DesktopMenu navLinks={navLinks} />
          </div>

          {/* Right side actions */}
          <div className="flex items-center lg:w-1/3 justify-end space-x-4">
            <button
              onClick={handleWishlistClick}
              className="relative text-gray-600 hover:text-gray-900"
              aria-label={`View wishlist containing ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <Link
              href="/inquire"
              className="bg-custom-lightblue text-nowrap text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-custom-darkblue transition-colors duration-200"
            >
              Tailored made
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
};

export default Header;

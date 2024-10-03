import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Globe, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export const Header = ({ header, className }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px is typically the breakpoint for lg in Tailwind
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (!isDesktop) return; // Only apply scroll behavior on desktop

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
        <div className="flex items-center justify-between py-4">
          {/* Logo aligned to the left */}
          <div className="flex-shrink-0 lg:w-2/12">
            <Link href="/">
              <span className="text-xl font-bold">Feliz Tour Egypt</span>
            </Link>
          </div>

          {/* Center - Desktop Menu (links centered only on desktop) */}
          <div className="hidden lg:flex lg:w-2/3 justify-center">
            <DesktopMenu navLinks={navLinks} />
          </div>

          {/* Right side - Social Icons, Language Change, and Book Tour Button */}
          <div className="flex items-center lg:w-1/3 justify-end space-x-4">
            <div className="hidden sm:flex space-x-2">
              <Facebook className="w-5 h-5 text-green-700 cursor-pointer" />
              <Instagram className="w-5 h-5 text-green-700 cursor-pointer" />
              <Twitter className="w-5 h-5 text-green-700 cursor-pointer" />
            </div>
            <button
              className="hidden lg:block focus:outline-none"
              onClick={handleLanguageChange}
              title="Change Language"
            >
              <Globe className="w-6 h-6 text-[#132f4e]" />
            </button>
            <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#45ca34]">
              Book Tour Now
            </button>
          </div>

          {/* Mobile Menu Toggle (visible on small screens) */}
          <button
            className="lg:hidden text-[#191e61] focus:outline-none"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
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

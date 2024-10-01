import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose, navLinks, onLanguageChange }) => {
  const [bgVisible, setBgVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBgVisible(true); // Show background after sidebar is fully open
    } else {
      setBgVisible(false); // Hide background when sidebar closes
    }
  }, [isOpen]);

  return (
    <>
      {/* Right-Side Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 bg-white lg:hidden`}
      >
        <nav className="relative z-10 px-8 py-4 h-full">
          {/* Close Button and Menu Title */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-2 text-gray-800 hover:text-blue-600"
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Change Button */}
          <button
            onClick={onLanguageChange}
            className="mt-8 flex items-center text-gray-800 hover:text-blue-600"
          >
            <Globe className="w-5 h-5 mr-2" />
            Change Language
          </button>
        </nav>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
            bgVisible ? "opacity-65" : "opacity-0"
          }`}
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;

import React, { useState, useEffect, useRef } from "react";
import { Facebook, Link } from "lucide-react";
import { WhatsAppIcon } from "@/components/atoms/icons/WhatsAppIcon";
import Image from "next/image";

import ShareImage from "../../../public/assets/noun-share-1058858.png";

interface ShareButtonProps {
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copyText, setCopyText] = useState("Copy Link");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Link"), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      default:
        console.error("Unsupported platform:", platform);
        return;
    }

    // Open share URL in a new tab
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 transition-all duration-200"
        aria-label="Share"
      >
        <Image src={ShareImage} alt="Share Icon" width={20} height={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              role="menuitem"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4 mr-3 text-blue-600" />
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              role="menuitem"
              aria-label="Share on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 mr-3" />
              Share on WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full border-t"
              role="menuitem"
              aria-label="Copy Link"
            >
              <Link className="w-4 h-4 mr-3" />
              {copyText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;

import React from "react";
import Logo from "../../../public/assets/srayaLogo.png";
import Image from "next/image";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-5">
      {/* Logo Image */}
      {/* <div className="mb-4">
        <Image src={Logo} alt="Company Logo" className="w-32 h-auto" />
      </div> */}
      {/* Linear Loader */}
      <div className="w-full max-w-xs">
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-[#e6e22f] animate-bar"></div>
        </div>
      </div>
      <style jsx>
        {`
          @keyframes bar {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-bar {
            animation: bar 1.5s infinite linear;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;

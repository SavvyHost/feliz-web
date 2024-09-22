import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import thxImage from "../../../public/assets/thx.png"; // Make sure this path is correct

type Props = {
  onClose: () => void; // Function to handle the close action
  message: string; // The text message to display
};

const Thanks: React.FC<Props> = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-col items-center text-center">
          <Image
            src={thxImage}
            alt="Thanks"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-segoe text-gray-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Thanks;

import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import thxImage from "../../../public/assets/thx.png"; // Make sure this path is correct

type Props = {
  onClose: () => void; // Function to handle the close action
  message: string; // The text message to display
};

const ThanksInquire: React.FC<Props> = ({ onClose, message }) => {
  return (
    <div className="p-2 text-center mx-auto flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
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
          <p className="text-lg font-segoe text-blue-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ThanksInquire;

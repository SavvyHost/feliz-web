import React from "react";

type Props = {
  title: string;
  description: string;
};

const OverViewAttraction: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-4 py-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 text-base text-center">{description}</p>
      </div>
    </div>
  );
};

export default OverViewAttraction;

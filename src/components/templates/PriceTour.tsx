import React from "react";
import { FaBed, FaHotel, FaRegHeart, FaSuitcase } from "react-icons/fa"; // Importing room type icons

type TourPrice = {
  id: number;
  title: string;
  price: number;
};

type TourPricesGroup = {
  id: number;
  title: string;
  from_month: string | null;
  to_month: string | null;
  prices: TourPrice[];
};

type Props = {
  DetailTour: {
    tour_prices: TourPricesGroup[];
  };
};

// Mapping room types to icons
const roomIcons: Record<string, React.ReactNode> = {
  SGL: <FaBed className="text-purple-500" />,
  DBL: <FaHotel className="text-blue-500" />,
  TPL: <FaRegHeart className="text-red-500" />,
  Suite: <FaSuitcase className="text-green-500" />,
};

const PriceTour: React.FC<Props> = ({ DetailTour }) => {
  const getIcon = (title: string) => {
    switch (title) {
      case "Standard":
        return <FaRegHeart className="text-yellow-400" />;
      case "VIP":
        return <FaHotel className="text-red-500" />;
      default:
        return <FaSuitcase className="text-blue-400" />;
    }
  };

  return (
    <div className="p-6 border-green-200 border rounded-lg bg-white mt-2 shadow-lg">
      <h1 className="text-2xl font-bold text-left mb-6">Tour Prices</h1>
      {DetailTour.tour_prices.map((group) => (
        <div
          key={group.id}
          className="mb-4 border border-gray-300 rounded-lg p-4  shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-2">
            {getIcon(group.title)}
            <h2 className="text-xl font-semibold ml-2">{group.title}</h2>
          </div>
          {group.prices.map((price) => (
            <div
              key={price.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <div className="flex items-center">
                {roomIcons[price.title] || (
                  <FaSuitcase className="text-gray-500" />
                )}
                <p className="text-lg ml-2">{price.title}</p>
              </div>
              <p className="text-lg font-semibold text-green-600">
                ${price.price}
              </p>
            </div>
          ))}
          {group.from_month && group.to_month && (
            <p className="mt-2 text-sm text-gray-600">
              Available from {group.from_month} to {group.to_month}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PriceTour;

// components/Prices.tsx
import { FC } from "react";

interface PriceItemProps {
  title: string;
  description: string;
  price: string;
}

const PriceItem: FC<PriceItemProps> = ({ title, description, price }) => (
  <div className="flex justify-between items-center border-b py-4">
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <span className="text-lg font-bold">{price}</span>
  </div>
);

const Prices: FC = () => {
  const priceData = [
    {
      title: "Standard Tour",
      description: "Includes guide, tastings, and entry fees.",
      price: "$49",
    },
    {
      title: "VIP Tour",
      description: "Includes everything in Standard plus a private guide.",
      price: "$79",
    },
    {
      title: "Family Package",
      description: "Discounted rate for up to 4 members.",
      price: "$120",
    },
    {
      title: "Group Tour",
      description: "For groups of 10+ people.",
      price: "$400",
    },
  ];

  return (
    <div className="w-full mx-auto mb-3 border rounded-lg px-4 py-2 mt-2 bg-white  border-green-200 shadow-md">
      <h3 className="text-2xl font-semibold mb-2">Tour Prices</h3>
      {priceData.map((item, index) => (
        <PriceItem
          key={index}
          title={item.title}
          description={item.description}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Prices;

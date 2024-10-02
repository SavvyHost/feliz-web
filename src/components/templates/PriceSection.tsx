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

interface PricesProps {
  DetailTour: {
    tour_prices: {
      title: string;
      prices: {
        id: number;
        title: string;
        price: number;
      }[];
    }[];
  };
}

const Prices: FC<PricesProps> = ({ DetailTour }) => {
  const tourPrices = DetailTour.tour_prices;

  return (
    <div className="w-full mx-auto mb-3 border rounded-lg px-4 py-2 mt-2 bg-white border-green-200 shadow-md">
      <h3 className="text-2xl font-semibold mb-2">Tour Prices</h3>
      {tourPrices.map((tourPrice, index) => (
        <div key={index}>
          <h4 className="text-xl font-semibold mb-2">{tourPrice.title}</h4>
          {tourPrice.prices.map((priceItem) => (
            <PriceItem
              key={priceItem.id}
              title={priceItem.title}
              description={`Price for ${priceItem.title.toLowerCase()}`}
              price={`$${priceItem.price}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Prices;

// components/OriginalExperience.tsx
import { FC } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

const OriginalExperience: FC = () => {
  return (
    <div className="w-full mx-auto mb-3 mt-2 px-4 py-2 border bg-white  border-green-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">The Original experience</h2>

      {/* Highlights Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">Highlights</h3>
        <ul className="list-disc ml-6 mt-2 text-gray-600">
          <li>
            Take a delicious dive into London's centuries-old multicultural
            neighborhood
          </li>
          <li>
            Savor a curated breakfast-to-lunch tour of the East End's most
            beloved eateries
          </li>
          <li>
            Uncover street art and hidden gems with a local in the coolest parts
            of town
          </li>
          <li>Slurp up a traditional curry in an atmospheric house setting</li>
          <li>
            Bite into London’s best salt beef bagel and end the experience on a
            sweet note
          </li>
        </ul>
      </section>

      {/* Full Description */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">Full description</h3>
        <p className="text-gray-600">
          Embark on a guided walking tour of London’s East End and get to know
          this iconic neighborhood through its cuisine. Relish sumptuous bites
          from a variety of cultures, from apple crumble to a salt beef bagel.
        </p>
        <button className="text-blue-600 mt-2 hover:underline">See more</button>
      </section>

      {/* Includes Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">Includes</h3>
        <ul className="ml-6 mt-2">
          <li className="flex items-center text-gray-600">
            <FaCheckCircle className="text-green-600 mr-2" /> Food tour
          </li>
          <li className="flex items-center text-gray-600">
            <FaCheckCircle className="text-green-600 mr-2" /> Guide
          </li>
          <li className="flex items-center text-gray-600">
            <FaCheckCircle className="text-green-600 mr-2" /> Tastings
          </li>
          <li className="flex items-center text-gray-600">
            <FaCheckCircle className="text-green-600 mr-2" /> Beer
          </li>
          <li className="flex items-center text-gray-600">
            <FaCheckCircle className="text-green-600 mr-2" /> Guide
          </li>
          <li className="flex items-center text-gray-600">
            <FaTimesCircle className="text-red-600 mr-2" /> Food lover’s guide
            (with insider tips and details)
          </li>
          <li className="flex items-center text-gray-600">
            <FaTimesCircle className="text-red-600 mr-2" /> Hotel pickup and
            drop-off
          </li>
        </ul>
      </section>

      {/* Not Suitable For */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">Not suitable for</h3>
        <ul className="ml-6 mt-2 text-gray-600">
          <li>Vegans</li>
          <li>People with gluten intolerance</li>
        </ul>
      </section>

      {/* Meeting Point */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">Meeting point</h3>
        <p className="text-gray-600">
          Meet at Poke House. Upon arrival at the gates at 109 and 111
          Commercial Street, between the two shop fronts, you will find an
          entrance into the Old Spitalfields Market. Walk into the market (the
          gate is called the Huguenot’s Gate). Directly ahead, you will find a
          seating area on the left and a coffee bar. Your guide will be waiting
          for you at one of the tables with the Eating Europe logo.
        </p>
        <a
          href="https://goo.gl/maps" // Replace with actual link
          className="text-blue-600 hover:underline mt-2 inline-flex items-center"
        >
          <FaMapMarkerAlt className="mr-1" /> Open in Google Maps
        </a>
      </section>

      {/* Important Information */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold">Important information</h3>
        <ul className="ml-6 mt-2 text-gray-600">
          <li>What to bring:</li>
          <li>Comfortable shoes</li>
          <li>Weather-appropriate clothing</li>
        </ul>
      </section>
    </div>
  );
};

export default OriginalExperience;

import { FC } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface TourInclude {
  id: number;
  description: string;
  status: string;
}

interface OriginalExperienceProps {
  DetailTour: {
    tour_includes?: TourInclude[]; // Made optional
  };
}

const OriginalExperience: FC<OriginalExperienceProps> = ({ DetailTour }) => {
  // Check if tour_includes is undefined
  if (!DetailTour || !DetailTour.tour_includes) {
    return null; // or return an alternative message if you prefer
  }

  return (
    <div className="w-full mx-auto mb-3 mt-2 px-4 py-2 border bg-white border-green-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Includes</h2>

      {/* Includes Section */}
      <section className="mb-6">
        <ul className="ml-2 lg:ml-6 mt-2">
          {DetailTour.tour_includes.map((item) => (
            <li key={item.id} className="flex items-center text-gray-600">
              <div>
                {item.status === "yes" ? (
                  <FaCheckCircle className="text-green-600 mr-2" />
                ) : (
                  <FaTimesCircle className="text-red-600 mr-2" />
                )}
              </div>
              {item.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Other sections remain unchanged */}
    </div>
  );
};

export default OriginalExperience;

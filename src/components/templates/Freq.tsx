import React, { useState } from "react";

// Define the FAQ item type
interface FAQItem {
  question: string;
  answer: string;
}

// Define the type for DetailTour including FAQs
interface DetailTour {
  tour_frequently_questions?: FAQItem[];
}

// Define the FAQ component with typed props
const FAQ: React.FC<{ DetailTour: DetailTour }> = ({ DetailTour }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-3xl font-segoe text-start mt-9 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="relative w-full mt-8 sm:mx-auto sm:max-w-2xl sm:px-10">
        <div className="mx-auto px-5">
          <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
            {DetailTour?.tour_frequently_questions?.map((faq, index) => (
              <div key={index} className="py-5">
                <div className="group">
                  <div
                    className="flex cursor-pointer list-none items-center justify-between font-medium"
                    onClick={() => toggleItem(index)}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`transition ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                  {openIndex === index && (
                    <p className="mt-3 text-neutral-600">{faq.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

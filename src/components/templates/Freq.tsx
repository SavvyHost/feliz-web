// components/FAQ.tsx
import { FC, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold">{question}</h4>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

interface FAQProps {
  DetailTour: {
    tour_frequently_questions: {
      question: string;
      answer: string;
    }[];
  };
}

const FAQ: FC<FAQProps> = ({ DetailTour }) => {
  const { tour_frequently_questions } = DetailTour;

  return (
    <div className="w-full mx-auto border px-4 py-2 mt-2 bg-white border-green-200 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions
      </h3>
      {tour_frequently_questions.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;

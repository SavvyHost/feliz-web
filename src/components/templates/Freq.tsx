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

const FAQ: FC = () => {
  const faqData = [
    {
      question: "What is included in the tour?",
      answer:
        "The tour includes a guide, tastings, and entry fees to select locations.",
    },
    {
      question: "How long does the tour last?",
      answer: "The tour typically lasts around 3.5 hours.",
    },
    {
      question: "Is the tour family-friendly?",
      answer:
        "Yes, the tour is suitable for all ages, though some activities may have age restrictions.",
    },
    {
      question: "Can I cancel or reschedule?",
      answer:
        "Yes, cancellations are allowed up to 24 hours in advance for a full refund.",
    },
  ];

  return (
    <div className="w-full mx-auto border px-4 py-2 mt-2 bg-white border-green-200 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions
      </h3>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;

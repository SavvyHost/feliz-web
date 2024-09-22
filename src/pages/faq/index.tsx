import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Slider from "react-slick";
import Loader from "@/components/molecules/Loader";

interface FaqQuestion {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  icon: React.ReactNode;
  questions: FaqQuestion[];
}

const faqData: FaqSection[] = [
  {
    title: "Account Overview",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    ),
    questions: [
      {
        question: "First time, what do I do next?",
        answer: "Here are the steps to get started...",
      },
      {
        question: "Changing your profile picture and other information",
        answer: "To update your profile picture, go to...",
      },
      {
        question: "I didn't get a confirmation email, what should I do next?",
        answer: "If you didn't receive a confirmation email, please check...",
      },
      {
        question:
          "What is the refund policy if I have to cancel during the month?",
        answer: "Our refund policy allows for cancellations within...",
      },
    ],
  },
  {
    title: "Billing & Payments",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    questions: [
      {
        question: "How do I update my payment information?",
        answer:
          "To update your payment information, go to the billing section...",
      },
      {
        question: "Can I pay using PayPal?",
        answer: "Yes, we accept PayPal as one of the payment methods...",
      },
      {
        question: "What are the accepted payment methods?",
        answer: "We accept credit cards, debit cards, and PayPal...",
      },
      {
        question: "How do I view my payment history?",
        answer: "To view your payment history, go to your account dashboard...",
      },
    ],
  },
  {
    title: "Technical Support",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    questions: [
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on 'Forgot Password' at the login screen...",
      },
      {
        question: "I can't log in, what should I do?",
        answer: "If you're unable to log in, try resetting your password...",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "You can contact customer support by emailing support@example.com...",
      },
      {
        question: "My account was hacked, what should I do?",
        answer:
          "If you suspect your account was hacked, change your password immediately...",
      },
    ],
  },
];
const Faq: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Slick settings for mobile carousel
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen mt-16 lg:mt-24">
      <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-segoe text-gray-800 mb-6">FAQ Topics</h2>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Slider {...slickSettings}>
            {faqData.map((section, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2  rounded-lg flex items-center space-x-0 transition-colors duration-200 ${
                  activeTab === index
                    ? "bg-yellow-100 text-yellow-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(index)}
              >
                <div className="flex flex-row justify-center items-center gap-4 text-center">
                  <div className="text-sm ">{section.icon}</div>
                  <span className="font-segoe text-sm">{section.title}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop Tabs */}
        <ul className="hidden md:block space-y-2">
          {faqData.map((section, index) => (
            <li
              key={index}
              className={`cursor-pointer p-3 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                activeTab === index
                  ? "bg-yellow-100 text-yellow-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {section.icon}
              <span className="font-segoe">{section.title}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="w-full md:w-3/4 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-segoe text-gray-800 mb-4">
            {faqData[activeTab].title}
          </h1>
          <div className="relative">
            <input
              className="w-full border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-yellow-500 transition-colors duration-200"
              type="search"
              placeholder="Search FAQ..."
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {faqData[activeTab].questions
            .filter((q) => q.question.toLowerCase().includes(searchQuery))
            .map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <h4 className="text-lg font-segoe text-gray-700 flex-grow">
                    {item.question}
                  </h4>
                  <ChevronDown
                    className={`h-5 w-5 text-yellow-500 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <p className="mt-3 text-gray-600 font-segoe">{item.answer}</p>
                )}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Faq;

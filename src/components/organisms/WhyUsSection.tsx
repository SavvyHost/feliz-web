import { FC } from "react";
import Slider from "react-slick";
import { FaLeaf, FaShieldAlt, FaCompass, FaHandsHelping } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeatureSection: FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const features = [
    {
      icon: FaLeaf,
      title: "Sustainable Travel",
      description:
        "Adventure sustainably with TourRadar. We are committed to conscious travel.",
      link: "View our pledge",
      href: "#",
    },
    {
      icon: FaShieldAlt,
      title: "Trust and Confidence",
      description:
        "Book with confidence through verified operators and secure payment systems.",
      link: "Learn more",
      href: "#",
    },
    {
      icon: FaCompass,
      title: "Discover New Places",
      description:
        "Explore destinations you've never been to with carefully curated tours that highlight local cultures.",
      link: "Start exploring",
      href: "#",
    },
    {
      icon: FaHandsHelping,
      title: "Support Local Communities",
      description:
        "Every booking you make contributes to the wellbeing of local communities around the globe.",
      link: "Learn how",
      href: "#",
    },
  ];

  const FeatureItem = ({ icon: Icon, title, description, link, href }) => (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-4 text-green-600 flex items-center justify-center">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 max-w-xs">
        {description}
        <a href={href} className="text-green-500">
          {" "}
          {link}
        </a>
        .
      </p>
    </div>
  );

  return (
    <section className="max-w-screen-xl mx-auto py-10 flex flex-col items-center">
      {/* Slick Slider for mobile */}
      <div className="block lg:hidden w-full">
        <Slider {...settings}>
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </Slider>
      </div>

      {/* Regular View for larger screens */}
      <div className="hidden lg:flex justify-center items-center space-x-12">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;

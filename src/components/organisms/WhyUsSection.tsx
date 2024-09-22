import React from "react";
import Outline from "../../../public/assets/ic_outline-photo.png"; // Import your image
import ExpertGuidesCard from "../molecules/WhyUs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WhyUsSection: React.FC = () => {
  const guides = [
    {
      id: 1,
      title: "Expert Guide 1",
      description: "Explore the pyramids with expert knowledge.",
      image: Outline,
    },
    {
      id: 2,
      title: "Expert Guide 2",
      description: "Discover the treasures of ancient Egypt.",
      image: Outline,
    },
    {
      id: 3,
      title: "Expert Guide 3",
      description: "Experience the Nile like never before.",
      image: Outline,
    },
    {
      id: 4,
      title: "Expert Guide 4",
      description: "Uncover the mysteries of the Sphinx.",
      image: Outline,
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-8">
      <h2 className="text-left text-black font-segoe sm:font-semi-bold font-medium text-2xl md:text-special-offer md:p-10 p-5">
        Why Choose Us
      </h2>

      {/* Mobile Slider */}
      <div className="block md:hidden">
        <Slider {...settings}>
          {guides.map((guide) => (
            <ExpertGuidesCard
              key={guide.id}
              title={guide.title}
              description={guide.description}
              image={guide.image}
            />
          ))}
        </Slider>
      </div>

      {/* Desktop Flex Layout */}
      <div className="hidden md:flex flex-wrap justify-center px-24">
        {guides.map((guide) => (
          <ExpertGuidesCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            image={guide.image}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyUsSection;

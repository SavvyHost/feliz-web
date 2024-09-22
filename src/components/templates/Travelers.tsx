import React, { useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import Back from "../../../public/assets/userbg.jpeg";
import User from "../../../public/assets/infocard.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "@mui/material";

type UserProfileCardProps = {
  imageSrc: StaticImageData;
  userPhoto: StaticImageData;
  username: string;
  rating: number;
  description: string;
};

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  imageSrc,
  userPhoto,
  username,
  rating,
  description,
}) => {
  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden">
      {/* Left Section: Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src={imageSrc}
          alt="User Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      {/* Right Section: User Details */}
      <div className="w-full md:w-1/2 p-4">
        <div className="flex items-center mb-4">
          <Image
            src={userPhoto}
            alt={username}
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300 mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{username}</h3>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const CarouselModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const cards = [
    {
      imageSrc: Back,
      userPhoto: User,
      username: "John Doe",
      rating: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imageSrc: Back,
      userPhoto: User,
      username: "Jane Smith",
      rating: 5,
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Profile Carousel"
      className="absolute inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      style={{
        content: {
          borderRadius: "10px",
          border: "none",
          padding: 0,
          inset: "auto",
          maxWidth: "90%",
          maxHeight: "90%",
        },
      }}
    >
      <div className="relative w-full max-w-4xl">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div key={index} className="p-4">
              <UserProfileCard
                imageSrc={card.imageSrc}
                userPhoto={card.userPhoto}
                username={card.username}
                rating={card.rating}
                description={card.description}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Modal>
  );
};

const UserProfilePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-2 md:p-4">
      <UserProfileCard
        imageSrc={Back}
        userPhoto={User}
        username="John Doe"
        rating={4}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Button
        onClick={openModal}
        className="mt-6 flex items-center capitalize px-4 py-2 border border-opacity-60 border-yellow-700 bg-yellow-100 text-[#A16207] font-segoe text-lg rounded-md hover:bg-[#8a4c03] hover:text-white transition-colors duration-300"
      >
        View More Details
      </Button>
      <CarouselModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default UserProfilePage;

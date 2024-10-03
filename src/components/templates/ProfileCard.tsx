import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import User from "../../../public/assets/infocard.png";

type ProfileCardProps = {
  name: string;
  username: string;
  date: string;
  rating: number;
  content: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  date,
  rating,
  content,
}) => {
  return (
    <div className="relative mr-3 overflow-hidden">
      <div className="">
        <div className="flex items-start mb-4">
          <Image
            src={User}
            alt="Profile picture"
            width={48}
            height={48}
            className="rounded-full mr-3"
          />
          <div className="flex-1">
            <h3 className="font-bold text-black">{name}</h3>
            <div className="text-sm text-gray-500">
              <span>@{username}</span>
              <span className="mx-2">•</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <FaStar key={i + rating} className="text-gray-300" />
          ))}
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

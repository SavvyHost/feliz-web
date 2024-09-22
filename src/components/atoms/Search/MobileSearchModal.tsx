import React, { useState } from "react";
import SearchInput from "./SearchInput";
import SearchModal from "./SearchModal";

const locations = ["Location 1", "Location 2", "Location 3"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MobileSearchModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="mt-0">
      <SearchInput setIsModalOpen={setIsModalOpen} />
      <SearchModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        locations={locations}
        months={months}
      />
    </div>
  );
};

export default MobileSearchModal;

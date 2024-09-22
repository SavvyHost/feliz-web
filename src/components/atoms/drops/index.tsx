import React, { useState } from "react";
import { SelectChangeEvent, useMediaQuery, useTheme } from "@mui/material";
import MobileFilter from "./MobileFilter";
import DropdownMenu from "./DropdownMenu";
import FilterModal from "./FilterModal";

const filterOptions = [
  { label: "Popular filter", options: ["Option 1", "Option 2", "Option 3"] },
  // { label: "Facilities", options: ["Wifi", "Parking", "Restaurant"] },
  // { label: "High Rated", options: ["4+ stars", "3+ stars", "2+ stars"] },
  // { label: "Tour Date", options: ["Today", "Tomorrow", "This week"] },
  { label: "Price", options: ["$0-$50", "$50-$100", "$100+"] },
  { label: "Adventure Type", options: ["Hiking", "Water sports", "City tour"] },
  { label: "Age Range", options: ["All ages", "18+", "21+"] },
  { label: "Max Group Size", options: ["1-5", "6-10", "11+"] },
];

const Drops: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Updated handler for dropdown changes
  const handleSelectChange =
    (label: string) => (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      setSelectedOptions((prev) => ({
        ...prev,
        [label]: value,
      }));
    };

  // Wrapper function to handle select changes for MobileFilter
  const handleMobileSelectChange = (event: SelectChangeEvent<string>) => {
    // Extract the label or handle change based on your logic
    const label = "Your Logic to Determine the Label"; // Adjust as needed
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: event.target.value,
    }));
  };

  return (
    <div className="flex sm:flex-row flex-wrap items-center justify-center gap-3 p-3 px-5">
      {isMobile ? (
        <MobileFilter
          options={filterOptions}
          onSelectChange={handleMobileSelectChange} // Use the updated handler
          onOpenModal={handleOpenModal}
        />
      ) : (
        filterOptions.map((filter) => (
          <DropdownMenu
            key={filter.label}
            label={filter.label}
            options={filter.options}
            selectedOption={selectedOptions[filter.label] || ""}
            openDropdown={openDropdowns[filter.label] || false}
            onClick={() => toggleDropdown(filter.label)}
            onSelectChange={handleSelectChange(filter.label)} // Ensure this is a function
          />
        ))
      )}

      <FilterModal
        open={openModal}
        onClose={handleCloseModal}
        options={filterOptions}
        onOptionClick={(option) => console.log("Selected option:", option)}
      />
    </div>
  );
};

export default Drops;

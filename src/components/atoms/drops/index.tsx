import React, { useState } from "react";
import {
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MobileFilter from "./MobileFilter";
import DropdownMenu from "./DropdownMenu";
import FilterModal from "./FilterModal";
import CustomSvgIcon from "./CustomSvgIcon";

const filterOptions = [
  { label: "Popular", options: ["Option 1", "Option 2", "Option 3"] },
  { label: "Price", options: ["$0-$50", "$50-$100", "$100+"] },
  { label: "Adventure", options: ["Hiking", "Water sports", "City tour"] },
  { label: "Age ", options: ["All ages", "18+", "21+"] },
  { label: "Max Size", options: ["1-5", "6-10", "11+"] },
];

// Create a custom theme with green border

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

  const handleSelectChange =
    (label: string) => (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      setSelectedOptions((prev) => ({
        ...prev,
        [label]: value,
      }));
    };

  const handleMobileSelectChange = (event: SelectChangeEvent<string>) => {
    const label = event.target.name; // Assuming the name attribute is set to the filter label
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: event.target.value,
    }));
  };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // Implement your filter application logic here
  };

  return (
    <div className="flex sm:flex-row flex-wrap items-start justify-start gap-3">
      {isMobile ? (
        <MobileFilter
          options={filterOptions}
          onSelectChange={handleMobileSelectChange}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <>
          {filterOptions.slice(0, 4).map((filter) => (
            <DropdownMenu
              key={filter.label}
              label={filter.label}
              options={filter.options}
              selectedOption={selectedOptions[filter.label] || ""}
              openDropdown={openDropdowns[filter.label] || false}
              onClick={() => toggleDropdown(filter.label)}
              onSelectChange={handleSelectChange(filter.label)}
            />
          ))}
          <div className="flex-grow" />{" "}
          {/* This div will take up the available space */}
          <div
            className="flex justify-center gap-x-2 cursor-pointer hover:bg-green-200 bg-white border border-green-400 p-2 rounded-[4px] px-3"
            onClick={handleOpenModal}
          >
            <div className="">Filters</div>

            <span>
              <CustomSvgIcon />
            </span>
          </div>
        </>
      )}

      <FilterModal
        open={openModal}
        onClose={handleCloseModal}
        filterGroups={filterOptions.map((option) => ({
          label: option.label,
          options: option.options.map((opt) => ({
            label: opt,
            value: opt,
            checked: selectedOptions[option.label] === opt,
          })),
        }))}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default Drops;

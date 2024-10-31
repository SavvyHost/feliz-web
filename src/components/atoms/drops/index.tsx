import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import FilterModal from "./FilterModal";
import DropdownMenu from "./DropdownMenu";
import MobileFilter from "./MobileFilter";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

interface FilterOption {
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  { label: "Popular", options: ["Option 1", "Option 2", "Option 3"] },
  { label: "Price", options: ["$0-$50", "$50-$100", "$100+"] },
  { label: "Adventure", options: ["Hiking", "Water sports", "City tour"] },
  { label: "Age", options: ["All ages", "18+", "21+"] },
  { label: "Max Size", options: ["1-5", "6-10", "11+"] },
];

const Drops: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSelectChange = (label: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleMobileSelectChange = (label: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    setOpenModal(false);
  };

  return (
    <div className="flex sm:flex-row flex-wrap items-start justify-start gap-3 py-2 px-0">
      {isMobile ? (
        <MobileFilter
          options={filterOptions}
          selectedOptions={selectedOptions} // Pass the object directly
          onSelectChange={handleMobileSelectChange} // Pass the modified handler
          onOpenModal={handleOpenModal}
        />
      ) : (
        filterOptions.map((filter) => (
          <DropdownMenu
            key={filter.label}
            label={filter.label}
            options={filter.options}
            selectedOption={selectedOptions[filter.label] || ""}
            onSelectChange={(value) => handleSelectChange(filter.label, value)}
          />
        ))
      )}

      <div className="flex-grow" />

      <button
        onClick={handleOpenModal}
        className="lg:flex hidden items-center gap-x-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span>Filters</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {openModal && (
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
      )}
    </div>
  );
};

export default Drops;

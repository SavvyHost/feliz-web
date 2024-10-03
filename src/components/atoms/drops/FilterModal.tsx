import React from "react";
import { Modal, Box, Button } from "@mui/material";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  options: { label: string; options: string[] }[];
  onOptionClick: (option: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  options,
  onOptionClick,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    className="flex items-end justify-center"
  >
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: "80%",
        overflowY: "auto",
      }}
    >
      {options.map((filter) => (
        <div key={filter.label} className="mb-4">
          <h3 className="font-semibold mb-2">{filter.label}</h3>
          {filter.options.map((option) => (
            <Button
              key={option}
              onClick={() => onOptionClick(option)}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
            >
              {option}
            </Button>
          ))}
        </div>
      ))}
      <Button
        onClick={onClose}
        className="bg-green-700 p-3 px-6 text-white fixed bottom-0 left-0 right-0 rounded-t-md"
      >
        Apply
      </Button>
    </Box>
  </Modal>
);

export default FilterModal;

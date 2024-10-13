import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

interface DropdownMenuProps {
  label: string;
  options: string[];
  openDropdown: boolean;
  selectedOption: string;
  onClick: () => void;
  onSelectChange: (event: SelectChangeEvent<string>) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  openDropdown,
  selectedOption,
  onClick,
  onSelectChange,
}) => (
  <div className="relative w-full sm:w-[100px] lg:w-[200px]">
    <FormControl
      variant="outlined"
      size="small"
      onClick={onClick} // Toggle dropdown on click
      sx={{ minWidth: 180, marginRight: 2 }} // Adjust width and spacing
    >
      <InputLabel id={`${label}-dropdown-label`} className="text-base">
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-dropdown-label`}
        value={selectedOption}
        onChange={onSelectChange}
        label={label}
        open={openDropdown}
        IconComponent={ChevronDown}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300, // Limit dropdown height
              width: 400, // Adjust width if necessary
            },
          },
          disableScrollLock: true, // Prevents scrollbar behavior on dropdown
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);

export default DropdownMenu;

import React from "react";
import { Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import CustomSvgIcon from "./CustomSvgIcon";

interface MobileFilterProps {
  options: { label: string; options: string[] }[];
  onSelectChange: (event: SelectChangeEvent<string>) => void;
  onOpenModal: () => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  options,
  onSelectChange,
  onOpenModal,
}) => (
  <div className="flex items-center w-full overflow-hidden">
    <div className="w-7/12 flex overflow-x-auto">
      {options.map((filter) => (
        <Select
          key={filter.label}
          value=""
          displayEmpty
          onChange={onSelectChange}
          className="mr-2 border border-transparent"
          sx={{
            minWidth: 120,
            "& .MuiSelect-select": {
              paddingY: "8px",
              fontSize: "0.875rem",
            },
          }}
          renderValue={(selected: unknown) => {
            if ((selected as string[]).length === 0) {
              return filter.label;
            }
            return selected as string;
          }}
        >
          {filter.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ))}
    </div>
    <Button
      className="ml-4 flex text-nowrap justify-between capitalize items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-black"
      onClick={onOpenModal}
    >
      <CustomSvgIcon />
      All filters
    </Button>
  </div>
);

export default MobileFilter;

import React from "react";
import {
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomSvgIcon from "./CustomSvgIcon";

interface MobileFilterProps {
  options: { label: string; options: string[] }[];
  onSelectChange: (event: SelectChangeEvent<string>) => void;
  onOpenModal: () => void;
}

// Create a custom theme with blue border
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2196f3", // light blue
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2", // darker blue
          },
        },
        notchedOutline: {
          borderColor: "#90caf9", // very light blue
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: "#90caf9", // very light blue
          "&:hover": {
            borderColor: "#2196f3", // light blue
          },
        },
      },
    },
  },
});

const MobileFilter: React.FC<MobileFilterProps> = ({
  options,
  onSelectChange,
  onOpenModal,
}) => (
  <ThemeProvider theme={theme}>
    <div className="flex items-center w-full overflow-hidden">
      <div className="w-10/12 flex overflow-x-auto">
        {options.map((filter) => (
          <Select
            key={filter.label}
            value=""
            displayEmpty
            onChange={onSelectChange}
            className="mr-2"
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

      {/* Vertical Line Separator */}
      <div className="border-l h-10 border-gray-400 mx-4"></div>

      <Button
        variant="outlined"
        className="bg-green-400 flex text-nowrap justify-between capitalize items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg text-black"
        onClick={onOpenModal}
      >
        <CustomSvgIcon />
      </Button>
    </div>
  </ThemeProvider>
);

export default MobileFilter;

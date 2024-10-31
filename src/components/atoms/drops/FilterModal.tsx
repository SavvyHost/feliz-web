import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Close as CloseIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

interface FilterOption {
  label: string;
  value: string;
  checked: boolean;
}

interface FilterGroup {
  label: string;
  options: FilterOption[];
}

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  onApplyFilters: (filters: FilterGroup[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  filterGroups: initialFilterGroups,
  onApplyFilters,
}) => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(
    initialFilterGroups || []
  );
  const modalContentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setFilterGroups(initialFilterGroups || []);
  }, [initialFilterGroups]);

  const handleOptionChange = (groupIndex: number, optionIndex: number) => {
    const newFilterGroups = [...filterGroups];
    newFilterGroups[groupIndex].options[optionIndex].checked =
      !newFilterGroups[groupIndex].options[optionIndex].checked;
    setFilterGroups(newFilterGroups);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filterGroups);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = filterGroups.map((group) => ({
      ...group,
      options: group.options.map((option) => ({ ...option, checked: false })),
    }));
    setFilterGroups(clearedFilters);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center p-4"
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            <FilterIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
            Filters
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: "auto", p: 0.5 }}>
            <CloseIcon />
          </Button>
        </Box>

        <Box
          ref={modalContentRef}
          sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}
        >
          {filterGroups.map((group, groupIndex) => (
            <Box key={group.label} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                {group.label}
              </Typography>
              {group.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={option.checked}
                      onChange={() =>
                        handleOptionChange(groupIndex, optionIndex)
                      }
                      color="primary"
                    />
                  }
                  label={option.label}
                  sx={{ display: "block", mb: 0.5 }}
                />
              ))}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            zIndex: 1,
          }}
        >
          <div
            onClick={handleClearFilters}
            color="primary"
            className="transition-colors hover:bg-red-300 hover:border-red-300 px-2 cursor-pointer bg-red-50 text-red-400 hover:text-white border-2 border-gray-300 p-2 rounded-lg"
          >
            Clear All
          </div>
          <div
            onClick={handleApplyFilters}
            className="transition-colors hover:bg-blue-300 hover:border-blue-300 px-2 cursor-pointer bg-blue-50 text-blue-400 hover:text-white border-2 border-gray-300 p-2 rounded-lg"
            color="primary"
          >
            Apply Filters
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;

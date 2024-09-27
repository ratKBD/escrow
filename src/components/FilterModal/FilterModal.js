import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import styles from "./filterModal.module.css";

const FilterModal = ({ onClose, applyFilters, selectedFilter, setSelectedFilter }) => {
  const [selectedRange, setSelectedRange] = useState(selectedFilter.range);
  const [selectedStartDate, setSelectedStartDate] = useState(selectedFilter.startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(selectedFilter.endDate);
  const [txnType, setTxnType] = useState(selectedFilter.txnType);

  const modalRef = useRef(null); // Ref for modal content

  const rangeOptions = {
    Recent: "recent",
    Today: "today",
    Yesterday: "yesterday",
    "Last 7 Days": "last7days",
    "Last 30 Days": "last30days",
    Custom: "custom",
  };

  const txnTypes = {
    Credit: "credit",
    Debit: "debit",
    All: "all",
  };

  useEffect(() => {
    // Initialize state based on selectedFilter
    setSelectedRange(selectedFilter.range);
    setSelectedStartDate(selectedFilter.startDate);
    setSelectedEndDate(selectedFilter.endDate);
    setTxnType(selectedFilter.txnType);
  }, [selectedFilter]);

  useEffect(() => {
    const now = dayjs();
    switch (selectedRange) {
      case "today":
        setSelectedStartDate(now.startOf("day"));
        setSelectedEndDate(now.endOf("day"));
        break;
      case "yesterday":
        setSelectedStartDate(now.subtract(1, "day").startOf("day"));
        setSelectedEndDate(now.subtract(1, "day").endOf("day"));
        break;
      case "last7days":
        setSelectedStartDate(now.subtract(7, "day").startOf("day"));
        setSelectedEndDate(now.endOf("day"));
        break;
      case "last30days":
        setSelectedStartDate(now.subtract(30, "day").startOf("day"));
        setSelectedEndDate(now.endOf("day"));
        break;
      case "recent":
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        break;
      case "custom":
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        break;
      default:
        break;
    }
  }, [selectedRange]);

  const handleDateChange = (newValue, isStartDate) => {
    if (isStartDate) {
      setSelectedStartDate(newValue);
    } else {
      setSelectedEndDate(newValue);
    }
    setSelectedRange("custom"); // Set to custom when dates are changed
  };

  const handleApplyFilters = () => {
    if (selectedRange === "custom" && (!selectedStartDate || !selectedEndDate)) {
      alert("Please select both start and end dates for custom range.");
      return;
    }
    if (selectedStartDate && selectedEndDate && selectedStartDate.isAfter(selectedEndDate)) {
      alert("Start date must be before end date.");
      return;
    }
    setSelectedFilter({
      range: selectedRange,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      txnType,
    });
    applyFilters({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      txnType,
      selectedRange,
    });
    onClose(); // Close modal after applying filters
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
  
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest('.MuiPopover-root') && // Close if not clicking on the popover
        !event.target.closest('.MuiButtonBase-root') // Close if not clicking on any MUI button
      ) {
        console.log("Closing modal...");
        onClose();
      } else {
        console.log("Clicked inside modal or button.");
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  




  return (
    <>
      <div className={styles.modalBackdrop} /> {/* Modal backdrop for click detection */}
      <div className={`${styles.modalContainer} shadow`} ref={modalRef} onClick={(event) => {
      // Other logic can go here, if needed
    }}>
        <div className={styles.modalContent}>
          <div className="d-flex justify-content-between">
            <FormControl style={{ width: "245px" }} className="pe-2">
              <InputLabel>Select Range</InputLabel>
              <Select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                label="Select Range"
              >
                {Object.entries(rangeOptions).map(([label, value]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Start Date"
        value={selectedStartDate}
        onChange={(newValue) => handleDateChange(newValue, true)}
        disabled={selectedRange === "recent"}
        textField={(params) => (
          <TextField
            {...params}
            sx={{ width: "300px" }}
          />
        )}
      />
    </LocalizationProvider>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div className="me-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Date"
                  value={selectedEndDate}
                  onChange={(newValue) => handleDateChange(newValue, false)} // Call handler for End Date
                  disabled={selectedRange === "recent"}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "300px" }} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <FormControl style={{ width: "220px" }}>
              <InputLabel>Txn Type</InputLabel>
              <Select
                value={txnType}
                onChange={(e) => setTxnType(e.target.value)}
                label="Txn Type"
              >
                {Object.entries(txnTypes).map(([label, value]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div
          className={`${styles.continueButton} d-flex justify-content-center align-items-center mousePointer p-2 mt-2`}
          onClick={handleApplyFilters}
        >
          Apply
        </div>
      </div>
    </>
  );
};

export default FilterModal;

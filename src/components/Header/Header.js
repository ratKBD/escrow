import React, { useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useAllProduct } from "../../api-context/commonApiContext";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const {
    setSelectedEscrowVal,
    setSelectedCompanyName,
    setSelectedEscrowName,
    selectedEscrowVal,
    selectedCompanyName,
    selectedEscrowName, // Make sure this is defined in the context
    filterEscrowVal,
    companyDropdown,
    companyDetails
  } = useAllProduct();
  useEffect(() => {
    if (!selectedCompanyName && companyDropdown.length > 0) {
      const defaultCompany = companyDropdown[0];
      setSelectedCompanyName(defaultCompany);
      localStorage.setItem("company_name", defaultCompany);
    }
    if (!selectedEscrowName && filterEscrowVal.length > 0) {
      const defaultEscrow = filterEscrowVal[0];
      setSelectedEscrowName(defaultEscrow);
      localStorage.setItem("escrow_name", defaultEscrow);
    }
  }, [companyDropdown, filterEscrowVal]); 

  return (
    <div className="d-flex justify-content-end mt-4">
   <FormControl sx={{ width: "250px", pr: 2 }}>
        <InputLabel id="company-select-label">Select Company</InputLabel>
        <Select
          labelId="company-select-label"
          id="company-select"
          value={selectedCompanyName}
          label="Select Company"
          onChange={(e) => {
            setSelectedCompanyName(e.target.value);
            localStorage.setItem("company_name", e.target.value);
          }}
          sx={{
            borderRadius: "12px",
          }}
        >
          {Array.isArray(companyDropdown) &&
            companyDropdown.map((data, index) => (
              <MenuItem key={index} value={data}>
                {data}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: "250px", pr: 2 }}>
        <InputLabel id="escrow-select-label">Select Escrow</InputLabel>
        <Select
          labelId="escrow-select-label"
          id="escrow-select"
          value={selectedEscrowName}
          label="Select Escrow"
          onChange={(e) => {
            setSelectedEscrowName(e.target.value);
            localStorage.setItem("escrow_name", e.target.value);
          }}
          sx={{
            borderRadius: "12px",
          }}
        >
          {Array.isArray(filterEscrowVal) &&
            filterEscrowVal?.map((data, index) => (
              <MenuItem key={index} value={data}>
                {data}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    <div className={styles.dropdown}>
      <img
        className={`${styles.vectorIcon1} dropbtn`}
        alt=""
        src="/user-circle.svg"
      />
      <div className={`${styles.dropdowncontent}`}>
        <div className="d-flex align-items-center p-2">
          <img
            className={`${styles.dropIcon} dropbtn`}
            alt=""
            src="/user-circle.svg"
          />
       
          <a href="#">{localStorage.getItem("user_name") ? localStorage.getItem("user_name") :companyDetails?.user_name}</a>
        </div>
        <div className="d-flex align-items-center p-2">
          <img
            className={`${styles.dropIcon} dropbtn`}
            alt=""
            src="/box-arrow-right.svg"
          />
          <a href="#">{"Logout"}</a>
        </div>
      </div>
    </div>
  </div>
);
};

export default Header;
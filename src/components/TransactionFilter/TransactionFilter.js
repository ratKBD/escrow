import React, { useEffect, useState } from "react";
import styles from "./transactionFilter.module.css";
import FilterModal from "../FilterModal/FilterModal";
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { useAllProduct } from "../../api-context/commonApiContext";

const TransactionFilter = ({ page, setSearch, dataSource, applyFilters,selectedFilter, setSelectedFilter }) => {
    const { selectedCompanyName,selectedEscrowName } = useAllProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearchInput] = useState("");
 
  const isFilterEnabled = selectedCompanyName?.trim()?.length > 0 && selectedEscrowName?.trim()?.length > 0;

  const tooltipMessage = !selectedCompanyName?.trim()?.length && !selectedEscrowName?.trim()?.length
  ? "Please select the company and escrow name"
  : !selectedCompanyName?.trim()?.length
  ? "Please select the company name"
  : !selectedEscrowName?.trim()?.length
  ? "Please select the escrow name"
  : "";

  const tooltipMessageSearch = dataSource.length===0
  ? "No data to search"
  : "";
  const tooltipMessageExport = dataSource.length===0
  ? "No data to Export"
  : "";

  const handleFilterClick = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300), // 300ms debounce time
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(search);
    }, 300); // Debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const convertToCSV = (data) => {
    const headers = [
      "Date",
      "Contact Name",
      "Debit",
      "Credit",
      "A/c Balance",
      "UTR/BANKRRN",
      "A/c No /UPI",
    ];
    const rows = data.map((row) => [
      new Date(row.stmt_timestamp).toLocaleDateString(),
      row.contact_name,
      row.debit_amount,
      row.credit_amount,
      row.closing_balance,
      row.utr,
      row.beneficiary_acno,
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(dataSource);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transaction_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchInput(value);
  debouncedSearch(value); // Call the debounced function
};

  return (
    <>
      <div className="d-flex justify-content-between mt-5 position-relative" /* style={{backgroundColor:"#F3F4F7"}} */>
        <div className={styles.tableHeading}>
          {page === "transaction"
            ? "Last Account Transaction"
            : "Free Statement"}
        </div>
        <div className={`d-flex`}>
        <div className={`${styles.filterLinesParent} mx-2`} title={tooltipMessageSearch ? tooltipMessageSearch :""} style={dataSource?.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}} >
            <img className={styles.filterLinesIcon} alt="Filter icon" src="/leadingicon.svg" />
            <input
              type="text"
              style={{ border: "none", outline: "none", color: "#9a9a9a" }}
              placeholder={`Search in ${page}`}
              onChange={handleSearchChange}
              aria-label="Search transactions"
              title={tooltipMessageSearch ? tooltipMessageSearch :""}
              disabled={dataSource?.length === 0 ? true : false}
            />
          </div>
          <div
  className={`${styles.filterLinesParent} mx-2 position-relative`}
  onClick={isFilterEnabled ? handleFilterClick : (e) => e.preventDefault()}  // Prevent click if disabled
  style={!isFilterEnabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}  // Visual feedback for disabled state
  title={!isFilterEnabled ? tooltipMessage : ''}  // Show tooltip when disabled
>
  <img
    className={styles.filterLinesIcon}
    alt=""
    src="/filterlines.svg"
  />
  <div className={styles.input1}>Filter</div>
</div>

          <div
            className={`${styles.download01Parent} mx-2`}
            onClick={downloadCSV}
            aria-label="Export transactions"
            style={dataSource?.length===0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            title={tooltipMessageExport ? tooltipMessageExport :""}
          >
            <img className={styles.filterLinesIcon} alt="Download icon" src="/download01.svg" />
            <div className={styles.input1}>Export</div>
          </div>
          <div className={styles.reLoadTable} onClick={()=>window.location.reload()}>
            <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
          </div>
        </div>
      </div>

      {/* Make sure the modal is positioned relative to the parent */}
      <div className="d-flex justify-content-end mt-4 position-relative">
      {isModalOpen && (
  <FilterModal 
    onClose={handleCloseModal} 
    page={page}  
    applyFilters={applyFilters} 
    selectedFilter={selectedFilter} // Pass selected filter
    setSelectedFilter={setSelectedFilter} // Function to update filter
  />
)}

      </div>
    </>
  );
};

export default TransactionFilter;

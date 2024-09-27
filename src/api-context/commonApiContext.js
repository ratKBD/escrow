import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AllDivisionContext = createContext([]);

export const ApiProvider = ({ children }) => {
  const [clientData, setClientData] = useState([]);
  const [userName, setUserName] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [filterEscrowVal, setFilterEscrowVal] = useState([]);
  const [filterCompanyName, setFilterCompanyName] = useState([]);
  const [selectedEscrowName, setSelectedEscrowName] = useState("");
  const [accountData, setAccountData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  /* Company Dropdown */
  const [companyDetails, setCompanyDetails] = useState([]);
  const [companyDropdown, setCompanyDropDown] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [statementData, setStatementData] = useState([]);

  useEffect(() => {
    const companyName = localStorage.getItem("company_name") || "";
    const escrowName = localStorage.getItem("escrow_name") || "";
    console.log("escrow-->", companyName, escrowName);
    setSelectedCompanyName(companyName);
    setSelectedEscrowName(escrowName);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        var headers = {
          "Content-Type": "application/json",
        };

        if (process.env.REACT_APP_API_TOKEN) {
          headers["Authorization"] = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
        }

        const result = await axios({
          method: "POST",
          url: "https://portalapi.eazypayouts.com/v1/user/get_user_profile",
          headers,
        });
        console.log("data==>", result.data.data);

        const data = result.data.data;
        localStorage.setItem("user_name",data.user_name)
        setCompanyDetails(data);
        setCompanyDropDown(Object.keys(data.companyMap));

        // Check if selectedCompanyName is available and set filterEscrowVal
        if (selectedCompanyName && data.companyMap) {
          const accounts = data.companyMap[selectedCompanyName]?.accounts || [];
          setFilterEscrowVal(accounts);
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [selectedCompanyName]); // Add selectedCompanyName as a dependency

  useEffect(() => {
    setTransactionData([]);
    if (selectedEscrowName?.length > 0) {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
          var headers = {
            "Content-Type": "application/json",
          };

          if (process.env.REACT_APP_API_TOKEN) {
            headers["Authorization"] = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
          }

          const payload = {
            account: selectedEscrowName,
            company: selectedCompanyName,
          };

          const result = await axios({
            method: "POST",
            url: "https://portalapi.eazypayouts.com/v1/user/get_balance_and_latest_transactions",
            headers,
            data: payload, // Pass payload in the data field
          });

          setTransactionData(result.data); // Set the transaction data
        } catch (error) {
          setError(error.message || "An error occurred");
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      };
      fetchData();
    }
  }, [selectedEscrowName, selectedCompanyName]);

  useEffect(() => {
    setTransactionData([]);
    if (selectedEscrowName?.length > 0) {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
          var headers = {
            "Content-Type": "application/json",
          };

          if (process.env.DESCROW_APP_API_TOKEN) {
            headers["Authorization"] = `Bearer ${process.env.DESCROW_APP_API_TOKEN}`;
          }

          const payload ={
            "contact_id": "FinZace",
            "escrow_id": "AC06YL5S0XQAAAUQ",
            "to_date_IST": "27/9/2024, 11:59:59 pm",
            "num_of_transactions": 50
        }

          const result = await axios({
            method: "POST",
            url: "https://descrow.api.getvouched.co/v1/feestatement",
            headers,
            data: payload, // Pass payload in the data field
          });

          setStatementData(result.data); // Set the transaction data
        } catch (error) {
          setError(error.message || "An error occurred");
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      };
      fetchData();
    }
  }, [selectedEscrowName, selectedCompanyName]);

  return (
    <AllDivisionContext.Provider
      value={{
        setSelectedCompanyName,
        filterEscrowVal,
        selectedCompanyName,
        filterCompanyName,
        clientData,
        setClientData,
        dataSource,
        setDataSource,
        selectedEscrowName,
        setSelectedEscrowName,
        companyDropdown,
        transactionData,
        loading, // Provide loading state to context
      }}
    >
      {children}
    </AllDivisionContext.Provider>
  );
};

export const useAllProduct = () => {
  const context = useContext(AllDivisionContext);

  if (context === null) {
    throw new Error("useAllProduct must be used within a AllProductProvider");
  }
  if (!context) {
    throw new Error("useAllProduct must be used within a ApiProvider");
  }

  return context;
};

export default AllDivisionContext;

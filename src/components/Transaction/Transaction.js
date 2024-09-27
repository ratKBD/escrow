import React, { useEffect, useState } from "react";
import dayjs from 'dayjs'; 
import { Col, Row, Table,Spin } from "antd";
import SideBar from "../SideBar/SideBar";
import styles from "./transaction.module.css";
import TransactionFilter from "../TransactionFilter/TransactionFilter";
import Header from "../Header/Header";
import { useAllProduct } from "../../api-context/commonApiContext";
import Footer from "../Footer/Footer";
import { RightOutlined, DownOutlined } from "@ant-design/icons";


const Transaction = () => {
  const { transactionData,selectedCompanyName,loading } = useAllProduct();

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    range: "recent",
    startDate: null,
    endDate: null,
    txnType: "all", // or whatever default you prefer
  });

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    txnType: "",
    selectedRange: "recent", // Default to "recent"
  });

  // Utility to get dynamic date ranges
  const getDateRange = (rangeType) => {
    const today = dayjs();
    switch (rangeType) {
      case "today":
        return { startDate: today.startOf("day"), endDate: today.endOf("day") };
      case "yesterday":
        return {
          startDate: today.subtract(1, "day").startOf("day"),
          endDate: today.subtract(1, "day").endOf("day"),
        };
      case "last7days":
        return {
          startDate: today.subtract(7, "day").startOf("day"),
          endDate: today.endOf("day"),
        };
      case "last30days":
        return {
          startDate: today.subtract(30, "day").startOf("day"),
          endDate: today.endOf("day"),
        };
      default:
        return { startDate: null, endDate: null };
    }
  };

// Ensure dayjs is imported at the top of your file

 useEffect(() => {
  if (transactionData) {
    let filteredData = transactionData?.data?.stmts || [];

    // Apply search filter
    if (search.trim()) {
      filteredData = filteredData.filter((item) => {
        const combinedString = `${item.stmt_timestamp}${item.contact_name}${item.debit_amount}${item.credit_amount}${item.utr}${item.beneficiary_acno}${item.closing_balance}`.toLowerCase();
        return combinedString.includes(search.toLowerCase());
      });
    }

    // Apply additional filters
    filteredData = filteredData.filter((item) => {
      const itemDate = dayjs(item.stmt_timestamp, 'YYYY-MM-DD hh:mm:ss A'); // Parse the timestamp
      
      const isWithinDateRange =
        (!selectedFilter.startDate || itemDate.isAfter(dayjs(selectedFilter.startDate))) &&
        (!selectedFilter.endDate || itemDate.isBefore(dayjs(selectedFilter.endDate))) ||
        (selectedFilter.startDate && selectedFilter.endDate && itemDate.isBetween(dayjs(selectedFilter.startDate), dayjs(selectedFilter.endDate), null, '[]')); // Include boundaries

      const isTxnTypeMatch =
        selectedFilter.txnType === "all" ||
        (selectedFilter.txnType === "credit" && item.credit_amount) ||
        (selectedFilter.txnType === "debit" && item.debit_amount);

      return isWithinDateRange && isTxnTypeMatch;
    });

    // Apply "recent" filter logic correctly
    if (selectedFilter.range === "recent") {
      filteredData = filteredData
        .sort((a, b) => dayjs(b.stmt_timestamp, 'YYYY-MM-DD hh:mm:ss A') - dayjs(a.stmt_timestamp, 'YYYY-MM-DD hh:mm:ss A')) // Sort by date (descending)
        .slice(0, 25); // Take top 25 transactions
    }

    setDataSource(filteredData);
  }
}, [search, selectedFilter, transactionData,selectedCompanyName]);

  
  useEffect(() => {
    if (selectedFilter.range && selectedFilter.range !== "custom") {
      const { startDate, endDate } = getDateRange(selectedFilter.range);
      setSelectedFilter((prev) => ({
        ...prev,
        startDate,
        endDate,
      }));
    }
  }, [selectedFilter.range]);

  const columns = [
    {
      title: "",
      key: "expandIcon",
      render: (text, record) => (
        <span style={{ cursor: "pointer", marginRight: 8 }}>
          {/* Leave this space empty if you don't need an icon */}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "stmt_timestamp",
      key: "date",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>, // Format date if needed
    },
    {
      title: "Contact Name",
      dataIndex: "contact_name",
      key: "contactName",
    },
    {
      title: "Debit",
      dataIndex: "debit_amount",
      key: "debit",
      render: (text) => (
        <span style={{ color: "#FF4D49" }}>
          {text ? `₹ ${text}` : "N/A"} {/* Handle empty value */}
        </span>
      ),
    },
    {
      title: "Credit",
      dataIndex: "credit_amount",
      key: "credit",
      render: (text) => (
        <span style={{ color: "#029646" }}>
          {text ? `₹ ${text}` : "N/A"} {/* Handle empty value */}
        </span>
      ),
    },
    {
      title: "A/c Balance",
      dataIndex: "closing_balance",
      key: "accountBalance",
      render: (text) => (
        <span>
          {text ? `₹ ${text}` : "N/A"} {/* Handle empty value */}
        </span>
      ),
    },
    {
      title: "UTR/BANKRRN",
      dataIndex: "utr",
      key: "utr",
      render: (text) => <span>{text || "N/A"}</span>, // Handle empty value
    },
    {
      title: "A/c No /UPI",
      dataIndex: "beneficiary_acno",
      key: "upi",
      render: (text) => <span>{text || "N/A"}</span>, // Handle empty value
    },
  ];

  const onRowClick = (index) => {

    const newExpandedRowKeys = expandedRowKeys.includes(index) ? [] : [index];

    setExpandedRowKeys(newExpandedRowKeys);
  };

  const RedPlaceholder = ({ value }) => {
    return value || <span style={{ color: "#4C4E64" }}>------</span>;
  };
  
  const expandedRowRender = (record) => (
    <div style={{ display: "flex", padding: 16 }}>
      <div style={{ flex: 1, paddingRight: 16 }}>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>Date</span>
          <span>: &nbsp; <RedPlaceholder value={record.stmt_timestamp} /></span>
        </div>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>Contact Name</span>
          <span>: &nbsp; <RedPlaceholder value={record.contact_name} /></span>
        </div>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>Debit</span>
          <span>: &nbsp; <RedPlaceholder value={record.debit_amount} /></span>
        </div>
      </div>
      <div
        style={{
          borderLeft: record.debit_amount ? "1px dotted #d9d9d9" : "1px dotted red",
          margin: "auto", // Centers the dotted line vertically
        }}
      />
      <div style={{ flex: 1, paddingLeft: 16 }}>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>Credit</span>
          <span>: &nbsp; <RedPlaceholder value={record.credit_amount} /></span>
        </div>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>A/c Balance</span>
          <span>: &nbsp; <RedPlaceholder value={record.closing_balance} /></span>
        </div>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>UTR/BANKRRN</span>
          <span>: &nbsp; <RedPlaceholder value={record.utr} /></span>
        </div>
        <div style={{ display: "flex", marginBottom: 8 }}>
          <span style={{ width: 120, fontWeight: "bold" }}>A/c No /UPI</span>
          <span>: &nbsp; <RedPlaceholder value={record.beneficiary_acno} /></span>
        </div>
      </div>
    </div>
  );
  

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const applyFilters = (newFilters) => {
    // Here, we are merging the new filters and resetting to page 1
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="h-100">
      <Row>
        <Col xs={0} sm={0} md={0} lg={3} xl={3}>
          <SideBar />
        </Col>

        <Col xs={0} sm={0} md={0} lg={21} xl={21}>
          <div className="container">
            <Header />
            <div className={`${styles.hellogetintofintechParent} mt-5`}>
              <div className={styles.availableBalance}>
                Hello, {selectedCompanyName ? selectedCompanyName :""}
              </div>
              <div className={`${styles.welcomeToThe}`}>
                Welcome to the world of digital escrow
              </div>
            </div>
            <div
              className={`${styles.frameParent} mt-4 justify-content-around`}
            >
              <div className={styles.saveMoney1044644423Parent}>
                <div className={styles.saveMoney1044644423}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                </div>
                <div className={styles.availableBalanceParent}>
                  <div className={styles.availableBalance}>
                    Available Balance*
                  </div>
                  <div className={styles.div}>
                  ₹ {transactionData?.data?.balance}
                  </div>
                </div>
              </div>
              <div className={`${styles.saveMoney1044644423Parent} mx-3`}>
                <div className={styles.saveMoney1044644423}>
                  <img
                    className={styles.accountConfigurationIcon}
                    alt=""
                    src="/account-configuration.svg"
                  />
                </div>
                <div className={`${styles.availableBalanceParent} d-flex justify-content-between`}>
                  <div className={styles.availableBalance}>
                    Account Details*
                  </div>
                  <div>
                    Ac.no :{" "}
                    <span className="">
                      {transactionData?.data?.van?.acc_no}
                    </span>
                  </div>
                  <div>
                    IFSC &nbsp;  : <span>{transactionData?.data?.van.ifsc}</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.saveMoney1044644423Parent} mx-3`}>
                <div className={styles.saveMoney1044644423}>
                  <img
                    className={styles.accountConfigurationIcon}
                    alt=""
                    src="/wallet02.svg"
                  />
                </div>
                <div className={styles.availableBalanceParent}>
                  <div className={styles.availableBalance}>Opening Balance</div>
                  <div className={styles.div}>
                    {"0"}
                  </div>
                </div>
              </div>
              <div className={`${styles.saveMoney1044644423Parent} mx-3`}>
                <div className={styles.saveMoney1044644423}>
                  <img
                    className={styles.accountConfigurationIcon}
                    alt=""
                    src="/wallet04.svg"
                  />
                </div>
                <div className={styles.availableBalanceParent}>
                  <div className={styles.availableBalance}>Closing Balance</div>
                  <div className={styles.div}>
                    {"0"}
                  </div>
                </div>
              </div>
            </div>
            <TransactionFilter 
              page="transaction" 
              setSearch={setSearch} 
              dataSource={dataSource} 
              applyFilters={applyFilters} 
              selectedFilter={selectedFilter} // Pass down the selected filter
              setSelectedFilter={setSelectedFilter} // Function to update the selected filter
            />
          <div>
              {loading ? ( // Conditional rendering for loader
                <Spin size="large" tip="Loading..." className="d-flex justify-content-center align-items-center" /> // You can customize the loader
              ) : (
                <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record, index) => index}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: dataSource.length,
                  onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
                  pageSizeOptions: ["10", "20", "50", "100"], // Rows per page options
                  showSizeChanger: true, // Show the size changer dropdown
                }}
                expandable={{
                  expandedRowRender,
                  expandedRowKeys,
                  onExpand: (expanded, record) => onRowClick(dataSource.indexOf(record)),
                  rowExpandable: () => true,
                  expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                      <DownOutlined style={{ fontSize: "15px" }} onClick={(e) => onExpand(record, e)} />
                    ) : (
                      <RightOutlined style={{ fontSize: "15px" }} onClick={(e) => onExpand(record, e)} />
                    ),
                }}
                onRow={(record, index) => ({
                  onClick: () => onRowClick(index),
                })}
                rowClassName="clickable-row"
              />
              
              
              
              )}
            </div>
            <Footer />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Transaction;
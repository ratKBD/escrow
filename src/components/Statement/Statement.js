import React, { useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import { Col, Row, Table } from "antd";
import styles from "./statement.module.css";
import TransactionFilter from "../TransactionFilter/TransactionFilter";

const Statement = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    // {
    //   title: "",
    //   key: "expandIcon",
    //   render: (text, record) => (
    //     <span style={{ cursor: "pointer", marginRight: 8 }}>
    //       {/* Leave this space empty if you don't need an icon */}
    //     </span>
    //   ),
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>, // Format date if needed
    },
    {
      title: "File",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "Action",
      dataIndex: "debit",
      key: "debit",
      render: (text) => <span>{text.toFixed(2)}</span>, // Format numbers
    },
  ];

  return (
    <div className="h-100">
      <Row>
        <Col xs={0} sm={0} md={0} lg={3} xl={3}>
          <SideBar />
        </Col>

        <Col xs={0} sm={0} md={0} lg={21} xl={21}>
          <div className="container">
            <Header />
            <div
              className={`${styles.frameParent} mt-4 justify-content-between`}
            >
              <div className={styles.saveMoney1044644423Parent}>
                <div className={`${styles.saveMoney1044644423} m-2`}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                </div>
                <div className={styles.availableBalanceParent}>
                  <div className={styles.availableBalance}>
                    Available Balance*
                  </div>
                  <div className={styles.div}>{"0"}</div>
                </div>
              </div>
            </div>
            <TransactionFilter page={"statement"} />

            <div className={`${styles.centerPage}mt-5}`}>
              <Table
                dataSource={dataSource}
                columns={columns}
                rowKey="utr"
                // expandable={{
                //   expandedRowRender,
                //   expandedRowKeys,
                //   onExpand: (expanded, record) => onRowClick(record),
                //   defaultExpandAllRows: false,

                //   rowExpandable: () => true,
                //   expandIcon: ({ expanded, onExpand, record }) =>
                //     expanded ? (
                //       <DownOutlined
                //         style={{ fontSize: "15px" }}
                //         onClick={(e) => onExpand(record, e)}
                //       />
                //     ) : (
                //       <RightOutlined
                //         style={{ fontSize: "15px" }}
                //         onClick={(e) => onExpand(record, e)}
                //       />
                //     ),
                // }}
                // onRow={(record) => ({
                //   onClick: () => onRowClick(record),
                // })}
                rowClassName="clickable-row"
                pagination={false} // Disable pagination if not needed
              />
            </div>
            <Footer />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Statement;

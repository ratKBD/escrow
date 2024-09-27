import React, { useState } from "react";
import { styled, Typography } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import { Col, Row } from "antd";
import styles from "./payout.module.css"; // Import the CSS file
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import Footer from "../Footer/Footer";

const Payout = ({
  setSelectedEscrowVal,
  setSelectedCompanyName,
  selectedEscrowVal,
  selectedCompanyName,
  filterCompanyName,
  selectedEscrowName,
  setSelectedEscrowName,
}) => {
  const [age, setAge] = React.useState("");
  const [activeButton, setActiveButton] = useState("transaction");

  const [continueButton, setContinueButton] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="h-100">
      <Row>
        <Col xs={0} sm={0} md={0} lg={3} xl={3}>
          <SideBar />
        </Col>

        <Col xs={0} sm={0} md={0} lg={21} xl={21}>
          <div className="container ">
            <Header />
            <div className={`${styles.title} mt-5`}>Payout</div>
            {continueButton ? (
              <>
                <div className={`${styles.centerPage}`}>
                  <button
                    className={`${styles.transactionsButtons} ${
                      activeButton === "transaction" ? styles.activeButton : ""
                    } me-2`}
                    // onClick={() => handleButtonClick("transaction", "/transaction")}
                  >
                    <div className={styles.transactions}>
                      Return to Transaction
                    </div>
                  </button>
                  <button
                    className={`${styles.transactionsButtons} ${
                      activeButton === "transaction" ? styles.activeButton : ""
                    }`}
                    // onClick={() => handleButtonClick("transaction", "/transaction")}
                  >
                    <div className={styles.transactions}>
                      {"Proceed to Payouts"}
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`${styles.frameParent} mt-4 justify-content-between`}
                >
                  <div className={styles.saveMoney1044644423Parent}>
                    <div className={`${styles.saveMoney1044644423} m-2`}>
                      <img
                        className={styles.vectorIcon}
                        alt=""
                        src="/vector.svg"
                      />
                    </div>
                    <div className={styles.availableBalanceParent}>
                      <div className={styles.availableBalance}>
                        Available Balance*
                      </div>
                      <div className={styles.div}>{"0"}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Typography
                      variant="body2"
                      sx={{
                        border: "2px dotted #f44336",
                        padding: "0.5rem",
                        borderRadius: "12px",
                        backgroundColor: "#fee1e0",
                      }}
                    >
                      <img
                        className={`${styles.vectorIcon} pe-2`}
                        alt=""
                        src="/Error.svg"
                      />
                      {
                        "Insufficient Account balance to create a payout , Kindly fund your account and try again."
                      }
                    </Typography>
                  </div>
                </div>
                <div className={`${styles.centerPage} mt-1`}>
                  <div
                    className="shadow p-4 w-100"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="d-flex justify-content-around container">
                      <Box className="w-100 pe-2">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Select Contact
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age} // Ensure `age` state matches one of the MenuItem values
                            onChange={handleChange} // Make sure this function updates `age`
                            label="Select Contact" // Ensure the label prop matches the InputLabel
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Box className="w-100">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Select Bank Ac / UPI
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Select Bank Ac / UPI"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="d-flex justify-content-between container mt-4">
                      <div className="w-100">
                        <TextField
                          className="w-100 pe-2"
                          id="outlined-basic"
                          label="Amount"
                          variant="outlined"
                        />
                      </div>

                      <Box className="w-100">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Select Payment Mode
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Select Payment Mode"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="d-flex justify-content-between container mt-4">
                      <div className="w-100">
                        <TextField
                          className="w-100 pe-2"
                          id="outlined-basic"
                          label="Transaction Note"
                          variant="outlined"
                        />
                      </div>
                      <div className="w-100">
                        <TextField
                          className="w-100"
                          id="outlined-basic"
                          label="Internal Note"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div
                      className={` d-flex justify-content-between align-items-center m-4`}
                    >
                      <div className="w-25">
                        {paymentSuccess && (
                          <>
                            {" "}
                            <div>{"Enter Otp"}</div>
                            <input
                              className={`${styles.partitioned}`}
                              type="text"
                              maxlength="4"
                              style={{ width: "300px" }}
                            />
                            <div
                              className={`${styles.continueButton} d-flex justify-content-center p-2 mt-3 mousePointer`}
                              onClick={() => setContinueButton(true)}
                            >
                              {"Submit OTP"}
                            </div>
                          </>
                        )}
                      </div>

                      <div
                        className={`${styles.continueButton} d-flex justify-content-end align-items-center mousePointer p-2`}
                        onClick={() => setPaymentSuccess(true)}
                      >
                        <img
                          className={` pe-2`}
                          alt=""
                          src="/arrow-narrow-right.svg"
                        />
                        {"Continue"}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Footer />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Payout;

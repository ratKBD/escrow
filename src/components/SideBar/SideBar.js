import React, { useEffect, useState } from "react";
import styles from "./sideBar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get current path
  const [activeButton, setActiveButton] = useState("transaction"); // Default to "transaction"

  useEffect(() => {
    const path = location.pathname;
    if (path === "/transaction") {
      setActiveButton("transaction");
    } else if (path === "/payout") {
      setActiveButton("payout");
    } else if (path === "/statement") {
      setActiveButton("statement");
    }
  }, [location.pathname]);

  const handleButtonClick = (buttonId, path) => {
    setActiveButton(buttonId);
    navigate(path);
  };

  return (
    <div className={styles.sidenavecontainerParent}>
      <div className={` d-flex justify-content-center align-items-center`}>
        <img
          className={`${styles.escrowstackLogos27Icon}`}
          alt=""
          // src="/escrowstack-logos-27@2x.png"
          src="/Escrowstack.io_logo.svg"
        />
      </div>
      <div
        className={`${styles.sidenavecontainer} d-flex justify-content-center align-items-center`}
      >
        <b className={styles.getintofintech}>Getintofintech</b>
      </div>
      <button
        className={`${styles.transactionsButtons} ${
          activeButton === "transaction" ? styles.activeButton : ""
        }`}
        onClick={() => handleButtonClick("transaction", "/transaction")}
      >
        <img
          className={
            activeButton === "transaction" ? styles.arrowDownUpIcon : ""
          }
          alt=""
          src={
            activeButton === "transaction"
              ? "/arrowdownup.svg"
              : "/arrow-down-up.svg"
          }
        />
        <div className={styles.transactions}>Transaction</div>
      </button>

      <button
        className={`${styles.statementsButtons} ${
          activeButton === "payout" ? styles.activeButton : ""
        }`}
        onClick={() => handleButtonClick("payout", "/payout")}
      >
        <img
          className={styles.statementsButtonsChild}
          alt=""
          src={
            activeButton === "payout" ? "/journal-text.svg" : "/group-2352.svg"
          }
        />
        <div className={styles.statements}>Payout</div>
      </button>

      <button
        className={`${styles.transactionsButtons} ${
          activeButton === "statement" ? styles.activeButton : ""
        }`}
        onClick={() => handleButtonClick("statement", "/statement")}
      >
        <img
          className={styles.arrowDownUpIcon}
          alt=""
          src={activeButton === "statement" ? "Layer_1.svg" : "/Group 2354.svg"}
        />
        <div className={styles.transactions}>Fee statement</div>
      </button>
    </div>
  );
};

export default SideBar;

import React from "react";
import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={`${styles.footer} d-flex mt-5 container`}>
      <div className="w-100">
        <div>
          {
            "All trademarks, logos and brand names are the property of their respective owners. "
          }
        </div>
        <div>
          {
            "All company, product and service names used in this website are for identification purposes only."
          }
        </div>
        <div>
          {
            "Use of these names, trademarks and brands does not imply endorsement."
          }
        </div>
        <div className={`${styles.footerColor} text-shadow mt-2`}>
          {"Copyright © 2024 Escrowstack Pvt Ltd, All Rights Reserved"}
        </div>
      </div>
      <div className="w-100 text-center">
        Protected by &nbsp;
        <img
          className={`${styles.footerIcon}`}
          alt=""
          // src="/escrowstack-logos-27@2x.png"
          src="/Group 202.svg"
        />{" "}
        &nbsp; Monitored by &nbsp;
        <img
          className={`${styles.footerIcon}`}
          alt=""
          // src="/escrowstack-logos-27@2x.png"
          src="/Universal logo 1.svg"
        />
        &nbsp; &nbsp; Powered by &nbsp;
        <img
          alt=""
          // src="/escrowstack-logos-27@2x.png"
          src="/Escrowstack_logos 28.svg"
        />
      </div>
    </div>
  );
};

export default Footer;

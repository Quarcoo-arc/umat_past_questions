import React from "react";
import logo from "../../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../../assets/svgs/CorrectSign.svg";
import { ReactComponent as NutIcon } from "../../assets/svgs/NutIcon.svg";
import styles from "./Authentication.module.css";

const Authentication = ({
  children,
  headingText,
  longHeading = false,
  redIcon = false,
  admin = false,
}) => {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <div className={styles.container}>
          {admin && <NutIcon width="2.3rem" className={styles.smallNut} />}
          <h1
            className={`${styles.heading} ${longHeading ? styles.small : ""}`}
          >
            {headingText}
          </h1>
          <CorrectIcon
            width="10rem"
            className={`${styles.checkMark} ${redIcon ? styles.red : ""}`}
          />
          {admin && <NutIcon width="5rem" className={styles.largeNut} />}
        </div>
        {children}
      </div>
      <img src={logo} alt="" className={styles.logo} />
    </div>
  );
};

export default Authentication;

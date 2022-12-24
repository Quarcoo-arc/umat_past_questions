import React from "react";
import logo from "../../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../../assets/svgs/CorrectSign.svg";
import { ReactComponent as NutIcon } from "../../assets/svgs/NutIcon.svg";
import "./Authentication.css";

const Authentication = ({
  children,
  headingText,
  longHeading = false,
  redIcon = false,
  admin = false,
}) => {
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          {admin && <NutIcon width="2.3rem" className="nut-small" />}
          <h1 className={`heading ${longHeading ? "small" : ""}`}>
            {headingText}
          </h1>
          <CorrectIcon
            width="10rem"
            className={`checkMark ${redIcon ? "red" : ""}`}
          />
          {admin && <NutIcon width="5rem" className="nut-large" />}
        </div>
        {children}
      </div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default Authentication;

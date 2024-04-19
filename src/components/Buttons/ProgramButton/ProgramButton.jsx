import React from "react";
import styles from "./ProgramButton.module.css";

const ProgramButton = ({ active, onClick, value, id }) => {
  return (
    <button
      type="button"
      className={`${styles.formButton} ${active && styles.active}`}
      value={value}
      id={id}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default ProgramButton;

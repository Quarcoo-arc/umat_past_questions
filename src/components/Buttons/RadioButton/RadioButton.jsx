import React from "react";
import styles from "./RadioButton.module.css";

const RadioButton = ({ onClick, id, value, text, checked }) => {
  return (
    <div className={styles.radioButton} onClick={onClick}>
      <input
        type="radio"
        name={id}
        id={id}
        value={value}
        onChange={onClick}
        checked={checked}
      />
      <p onClick={onClick}>{text}</p>
    </div>
  );
};

export default RadioButton;

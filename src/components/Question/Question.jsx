import React from "react";
import styles from "./Question.module.css";

const Question = ({ link, index, onChange, checked }) => {
  return (
    // TODO: Style Checkbox
    <label htmlFor={`question${index}`} className={styles.question}>
      <input
        type="checkbox"
        name={`question${index}`}
        id={`question${index}`}
        onChange={onChange}
        data-url={link}
        checked={checked}
      />
      <label htmlFor={`question${index}`}>
        {decodeURIComponent(
          link.slice(link.indexOf("F") + 1, link.lastIndexOf("?"))
        )}
      </label>
    </label>
  );
};

export default Question;

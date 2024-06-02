import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as DropDownArrow } from "../../assets/svgs/DropDownArrow.svg";
import styles from "./SelectInput.module.css";

const SelectInput = ({ selectItem, options, selected, type }) => {
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleShowDropdown = () => setShowDropdown((prev) => !prev);

  // click-away event listener
  useEffect(() => {
    const clickAwayEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target) && showDropdown) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickAwayEvent);
    return () => {
      document.removeEventListener("mousedown", clickAwayEvent);
    };
  }, [ref, showDropdown]);

  return (
    <div
      ref={ref}
      className={`${styles["drop-down-container"]}`}
      onClick={toggleShowDropdown}
    >
      <p>{selected}</p>
      <DropDownArrow
        width="2rem"
        className={`${styles.dropdown} ${showDropdown ? styles.rotate : ""}`}
      />
      <div
        className={`${styles.dropdownContent} ${
          showDropdown ? styles.active : ""
        }`}
      >
        {options.map((item, idx) => (
          <p
            onClick={() => selectItem(type, item)}
            className={item === selected ? styles.selected : ""}
            key={idx}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectInput;

import React from "react";
import styles from "./StatisticCard.module.css";

const StatisticCard = ({ group, count }) => {
  return (
    <div className={styles.stats}>
      <h4>{group}</h4>
      <h1>{count}</h1>
    </div>
  );
};

export default StatisticCard;

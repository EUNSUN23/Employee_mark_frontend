import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ size }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles[size]}></div>
    </div>
  );
};

export default Loader;

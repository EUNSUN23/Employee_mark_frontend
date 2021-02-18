import React from "react";
import backgroundDefault_small from "../assets/backgroundDefault_small.png";
import styles from "./DefaultBackground.module.css";

const DefaultBackground = () => {
  console.log("Default");
  return (
    <div className={styles.DefaultBackground}>
      <img src={backgroundDefault_small} alt="defaultBackground" />
    </div>
  );
};

export default DefaultBackground;

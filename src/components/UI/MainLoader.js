import React from "react";
import styles from "./MainLoader.module.css";

const MainLoader = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.info}>Employee 데이터를 불러오고 있습니다</h1>
      <div className={styles.loader}></div>
    </div>
  );
};

export default MainLoader;

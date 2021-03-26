import React from "react";
import styles from "./BoardLoader.module.css";

const BoardLoader = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.info}>부서/직급 정보를 불러오는 중입니다</h1>
      <div className={styles.loader}></div>
    </div>
  );
};

export default BoardLoader;

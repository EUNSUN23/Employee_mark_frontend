import React from "react";
import styles from "./ScrollToTop.module.css";
const ScrollToTop = (props) => {
  const { show, handleOnScrollBtn } = props;
  console.log(show);
  return (
    <div
      onClick={() => {
        handleOnScrollBtn();
      }}
      className={show ? styles.visible : styles.invisible}
    >
      <span className={styles.text}>top</span>
    </div>
  );
};

export default ScrollToTop;

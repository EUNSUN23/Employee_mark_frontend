import React, { memo } from "react";
import styles from "./ScrollToTop.module.css";
const ScrollToTop = memo((props) => {
  const { show, handleOnScrollBtn } = props;
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
});

export default ScrollToTop;

import React, { memo } from "react";
import styles from "./ScrollToTop.module.css";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const ScrollToTop = memo((props) => {
  const { show, handleOnScrollBtn } = props;
  return (
    <div
      onClick={() => {
        handleOnScrollBtn();
      }}
      className={show ? styles.visible : styles.invisible}
    >
      <ExpandLessIcon size="small" className={styles.arrow} />
      <span className={styles.text}>top</span>
    </div>
  );
});

export default ScrollToTop;

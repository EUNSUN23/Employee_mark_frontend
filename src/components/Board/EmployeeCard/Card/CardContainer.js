import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import ScrollToTop from "../../../ScrollToTop";

const CardContainer = (props) => {
  const [scrollToTop, setScrollToTop] = useState(null);

  const { employeeCards } = props;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollToTop]);

  const handleScroll = (e) => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    scrollTop < 200 && scrollTop >= 0
      ? setScrollToTop(false)
      : setScrollToTop(true);
  };

  const handleOnScrollBtn = () => {
    console.log("scroll to top");
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div onScroll={(e) => handleScroll(e)}>
      <Grid container spacing={4}>
        {employeeCards}
        <ScrollToTop show={scrollToTop} handleOnScrollBtn={handleOnScrollBtn} />
      </Grid>
    </div>
  );
};

export default CardContainer;

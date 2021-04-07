import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import DeptEmpRadar from "./DeptEmpRadar";
import TitleEmpRadar from "./TitleEmpRadar";
import { debounce } from "lodash";

import SwiperCore, { Navigation, Autoplay } from "swiper/core";
import "swiper/swiper.min.css";

SwiperCore.use([Navigation, Autoplay]);

const useStyles = makeStyles(() => ({
  radarSwiper: {
    border: "1px solid red",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "auto auto",
    height: "500px",
  },
}));

const EmpRadar = ({ data }) => {
  const classes = useStyles();
  const deptEmp = data.dept;
  const titleEmp = data.title;
  const swiperRef = useRef(null);

  const updateSlides = (swiper) => {
    console.log("observe");
    // swiper.update();
  };

  return (
    <Swiper
      ref={swiperRef}
      className={classes.radarSwiper}
      slidesPerView={1}
      id="empRadar"
      spaceBetween={100}
      cssMode={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide className={classes.deptEmpRadar} id="deptEmpRadar">
        <DeptEmpRadar deptEmp={deptEmp} />
      </SwiperSlide>
      <SwiperSlide className={classes.titleEmpRadar} id="titleEmpRadar">
        <TitleEmpRadar titleEmp={titleEmp} />
      </SwiperSlide>
    </Swiper>
  );
};

export default EmpRadar;

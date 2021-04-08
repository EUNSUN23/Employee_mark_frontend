import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import DeptEmpRadar from "./DeptEmpRadar";
import TitleEmpRadar from "./TitleEmpRadar";

import SwiperCore, { Navigation, Autoplay } from "swiper/core";
import "swiper/swiper.min.css";

SwiperCore.use([Navigation, Autoplay]);

const useStyles = makeStyles(() => ({
  radarSwiper: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    height: "80%",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
}));

const EmpRadar = ({ data }) => {
  const classes = useStyles();
  const deptEmp = data.dept;
  const titleEmp = data.title;
  const swiperRef = useRef(null);

  return (
    <Swiper
      ref={swiperRef}
      className={classes.radarSwiper}
      slidesPerView={1}
      id="empRadar"
      spaceBetween={100}
      cssMode={true}
      centeredSlides={true}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide className={classes.deptEmpRadar}>
        <DeptEmpRadar deptEmp={deptEmp} />
      </SwiperSlide>
      <SwiperSlide className={classes.titleEmpRadar}>
        <TitleEmpRadar titleEmp={titleEmp} />
      </SwiperSlide>
    </Swiper>
  );
};

export default EmpRadar;

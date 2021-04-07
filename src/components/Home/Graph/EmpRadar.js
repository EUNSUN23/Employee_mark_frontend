import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import DeptEmpRadar from "./DeptEmpRadar";
import TitleEmpRadar from "./TitleEmpRadar";

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

  useEffect(() => {
    console.log(swiperRef.current.swiper);
    // swiperRef.current.swiper.autoplay.start();
  }, []);

  const onReachEndHandler = (swiper, deptEmp, titleEmp) => {
    console.log("end");
    const firstRadar = document.getElementById("deptEmpRadar");
    const secondRadar = document.getElementById("titleEmpRadar");
    const firstClone = firstRadar.cloneNode(true);
    const secondClone = secondRadar.cloneNode(true);
    swiper.activeIndex % 2 === 0
      ? swiper.appendSlide(secondClone)
      : swiper.appendSlide(firstClone);
  };

  return (
    <Swiper
      ref={swiperRef}
      className={classes.radarSwiper}
      slidesPerView={1}
      id="empRadar"
      spaceBetween={100}
      cssMode={true}
      loop={true}
      onSlideChange={() =>
        console.log("active", swiperRef.current.swiper.activeIndex)
      }
      onReachEnd={() => onReachEndHandler(swiperRef.current.swiper)}
      autoplay={{
        delay: 10000,
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

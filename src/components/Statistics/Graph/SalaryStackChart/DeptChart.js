import React, { useState, useCallback, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import Svg from "../../../../shared/svgIcons";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { setChartColor } from "../../../../shared/utility";
import CustomizedLabel from "../SalaryDist/CustomizedLabel";
import SalaryFilter from "./SalaryFilter";
import theme from "../../../../shared/theme";

SwiperCore.use([Navigation, Pagination]);

const useStyles = makeStyles(() => ({
  titleContainer: {
    position: "absolute",
    width: "50%",
    left: "50%",
    top: "20%",
    transform: "translateX(-50%)",
  },
  deptTitle: {
    "& h1": {
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
  },
  salaryFilter: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "70%",
    },
  },
  root: {
    width: "65%",
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translateX(-50%)",
  },
  swiperSlide: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto",
    listStyle: "none",
    position: "relative",
    height: 430,
  },
  chartContainer: {
    position: "absolute",
    left: 0,
  },
  backward: {
    position: "absolute",
    top: "16%",
    [theme.breakpoints.up("md")]: {
      left: "15%",
    },
    left: "10%",
    cursor: "pointer",
    zIndex: 500,
    "& div": {
      width: "50px",
      height: "50px",
    },
  },
  forward: {
    position: "absolute",
    top: "16%",
    [theme.breakpoints.up("md")]: {
      right: "15%",
    },
    right: "10%",
    cursor: "pointer",
    zIndex: 500,
    "& div": {
      width: "50px",
      height: "50px",
    },
  },
  moveInner: {
    fontSize: 80,
    color: "#333",
  },
  disabled: {
    fontSize: 80,
    color: "grey",
  },
}));

const DeptChart = ({ deptData }) => {
  const classes = useStyles();
  const [value, setValue] = useState(40000);
  const [disabledNav, setDisabledNav] = useState("backward");

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);
  const deptList = [
    "Customer Service",
    "Development",
    "Finance",
    "Human Resources",
    "Marketing",
    "Production",
    "Quality Management",
    "Research",
    "Sales",
  ];

  let chartSwiper;

  useEffect(() => {
    if (swiperRef.current) {
      chartSwiper = swiperRef.current.swiper;
    }
  });

  const onClickFilter = useCallback(
    (icon) => {
      const newValue = icon === "up" ? value + 10000 : value - 10000;
      if (newValue <= 160000 && newValue >= 40000) setValue(newValue);
    },
    [value]
  );

  const onClickForward = (chartSwiper) => {
    if (chartSwiper.isEnd) return;
    if (disabledNav === "backward") setDisabledNav(null);
    chartSwiper.slideNext();
  };

  const onClickBackward = (chartSwiper) => {
    if (chartSwiper.isBeginning) return;
    if (disabledNav === "forward") setDisabledNav(null);
    chartSwiper.slidePrev();
  };

  const disableNav = (chartSwiper) => {
    if (!chartSwiper.isEnd && !chartSwiper.isBeginning) return;
    chartSwiper.isEnd && setDisabledNav("forward");
    chartSwiper.isBeginning && setDisabledNav("backward");
  };
  const forwardClass = disabledNav === "forward" ? "disabled" : "moveInner";
  const backwardClass = disabledNav === "backward" ? "disabled" : "moveInner";

  if (!deptData) return null;

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Grid item className={classes.deptTitle}>
          <h1 ref={paginationRef} className="swiperPagination"></h1>
        </Grid>
        <Grid item className={classes.salaryFilter}>
          <SalaryFilter
            onClickFilter={onClickFilter}
            value={value}
            className={classes.title}
          />
        </Grid>
      </Grid>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        id="main"
        spaceBetween={40}
        pagination={{
          el: ".swiperPagination",
          type: "custom",
          renderCustom: (swiper, current, total) => {
            const deptName = deptList[current - 1];
            return deptName;
          },
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.params.pagination.el = paginationRef.current;
        }}
        onSlideChange={() => {
          disableNav(chartSwiper);
        }}
        scrollbar={{ draggable: true }}
        className={classes.root}
      >
        {Object.keys(deptData).map((dept, idx) => {
          const data = deptData[dept];
          return (
            <SwiperSlide key={`chart-${dept}`} className={classes.swiperSlide}>
              <ResponsiveContainer
                width="100%"
                height={380}
                className={classes.chartContainer}
              >
                <BarChart data={data} margin={{ top: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sal" tick={false} />
                  <YAxis
                    dataKey="cnt"
                    type="number"
                    domain={[0, "dataMax+100"]}
                  />

                  <Bar
                    dataKey="cnt"
                    fill="#8884d8"
                    label={<CustomizedLabel currentVal={value} />}
                  >
                    {data.map((entry, index) => {
                      const highlight = entry.sal === value;
                      const color = setChartColor(entry.dept_name, highlight);
                      return (
                        <Cell
                          fill={color}
                          key={`cell-${index}`}
                          stroke="false"
                          strokeDasharray="5,5"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        ref={navigationPrevRef}
        onClick={() => onClickBackward(chartSwiper)}
        className={classes.backward}
      >
        <div className={classes[backwardClass]}>
          <Svg name="ArrowLeft" component="div" />
        </div>
      </div>
      <div
        ref={navigationNextRef}
        onClick={() => onClickForward(chartSwiper)}
        className={classes.forward}
      >
        <div className={classes[forwardClass]}>
          <Svg name="ArrowRight" component="div" />
        </div>
      </div>
    </>
  );
};

export default DeptChart;

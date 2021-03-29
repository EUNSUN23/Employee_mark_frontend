import React, { useState, useCallback, memo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
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
import theme from "../../../../theme";

SwiperCore.use([Navigation, Pagination]);

const useStyles = makeStyles(() => ({
  titleContainer: {
    position: "absolute",
    width: "50%",
    left: "50%",
    top: "15%",
    transform: "translateX(-50%)",
  },
  title: {
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "flex",
      width: "400px",
    },
    "& span:nth-child(1)": {
      fontSize: "18px",

      fontWeight: "bold",
    },
    "& span:nth-child(2)": {
      fontSize: "26px",

      fontWeight: "bold",
    },
  },
  root: {
    width: "65%",
    position: "absolute",
    left: "50%",
    top: "30%",
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
    top: "18%",
    left: "15%",
    cursor: "pointer",

    zIndex: 500,
  },
  forward: {
    position: "absolute",
    top: "18%",
    right: "15%",
    cursor: "pointer",

    zIndex: 500,
  },
  moveInner: {
    fontSize: 80,
    color: "#333",
  },
}));

const DeptChart = ({ deptData }) => {
  const classes = useStyles();
  const [value, setValue] = useState(40000);

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

  let mySwiper;

  useEffect(() => {
    if (swiperRef.current) {
      mySwiper = swiperRef.current.swiper;
    }
  }, [value]);

  const onClickFilter = useCallback(
    (icon) => {
      const newValue = icon === "up" ? value + 10000 : value - 10000;
      if (newValue <= 160000 && newValue >= 40000) setValue(newValue);
    },
    [value]
  );

  const makeDeptChart = () => {
    if (!deptData) return null;

    return (
      <>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Grid item>
            <h1 ref={paginationRef} className="swiperPagination"></h1>
          </Grid>
          <SalaryFilter
            onClickFilter={onClickFilter}
            value={value}
            className={classes.title}
          />
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
              console.log("index", current);
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
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {
            console.log(swiper);
          }}
          onSlideChange={(swiper) => console.log("slide change", swiper)}
          className={classes.root}
        >
          {Object.keys(deptData).map((dept, idx) => {
            const data = deptData[dept];
            return (
              <SwiperSlide
                key={`chart-${dept}`}
                className={classes.swiperSlide}
              >
                <ResponsiveContainer
                  width="100%"
                  height={380}
                  className={classes.chartContainer}
                >
                  <BarChart data={data} margin={{ top: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sal" tick={false} />
                    <YAxis dataKey="cnt" />

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
          onClick={() => mySwiper.slidePrev()}
          className={classes.backward}
        >
          <ArrowLeftIcon className={classes.moveInner} />
        </div>
        <div
          ref={navigationNextRef}
          onClick={() => mySwiper.slideNext()}
          className={classes.forward}
        >
          <ArrowRightIcon className={classes.moveInner} />
        </div>
      </>
    );
  };

  return makeDeptChart();
};

export default DeptChart;

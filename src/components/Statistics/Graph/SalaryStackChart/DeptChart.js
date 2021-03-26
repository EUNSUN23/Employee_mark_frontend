import React, { useState, useCallback } from "react";
import { setChartColor } from "../../../../shared/utility";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { makeStyles } from "@material-ui/core/styles";

SwiperCore.use([Navigation, Pagination]);

const useStyles = makeStyles(() => ({
  root: {
    width: "80%",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  swiperSlide: {
    listStyle: "none",
    position: "relative",
    height: 380,
  },
  chartContainer: {
    position: "absolute",
    left: "48%",
    transform: "translateX(-50%)",
  },
}));

const DeptChart = ({ deptData }) => {
  // const [dept, setDept] = useState("Customer Service");
  const classes = useStyles();

  const makeDeptChart = (deptData) => {
    if (!deptData) return null;

    return (
      <Swiper
        slidesPerView={1}
        id="main"
        spaceBetween={500}
        pagination
        navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className={classes.root}
      >
        {Object.keys(deptData).map((dept, index) => {
          const data = deptData[dept];
          return (
            <SwiperSlide key={`chart-${dept}`} className={classes.swiperSlide}>
              <ResponsiveContainer
                width="70%"
                height={360}
                className={classes.chartContainer}
              >
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sal" />
                  <YAxis dataKey="cnt" />
                  <Bar dataKey="cnt" fill="#8884d8">
                    {data.map((entry, index) => {
                      const color = setChartColor(entry.dept_name);
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
    );
  };

  return makeDeptChart(deptData);
};

export default DeptChart;

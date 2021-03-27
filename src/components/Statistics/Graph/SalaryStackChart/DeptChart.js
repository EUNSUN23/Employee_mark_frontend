import React, { useState, useCallback, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Customized,
} from "recharts";
import { setChartColor } from "../../../../shared/utility";
import CustomizedLabel from "../SalaryDist/CustomizedLabel";
import SalaryFilter from "./SalaryFilter";
SwiperCore.use([Navigation, Pagination]);

const useStyles = makeStyles(() => ({
  dept: {
    position: "absolute",
    left: "25%",
  },
  root: {
    width: "65%",
    position: "absolute",
    left: "50%",
    top: "20%",
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
}));

const DeptChart = memo(({ deptData }) => {
  const classes = useStyles();
  const [dept, setDept] = useState("Customer ServIce");
  const [value, setValue] = useState(40000);

  const onClickFilter = useCallback(
    (icon) => {
      const newValue = icon === "up" ? value + 10000 : value - 10000;
      if (newValue <= 160000 && newValue >= 40000) setValue(newValue);
    },
    [value]
  );

  const makeDeptChart = (deptData, value) => {
    if (!deptData) return null;

    return (
      <>
        <h1 className={classes.dept}>{dept}</h1>

        <Swiper
          slidesPerView={1}
          id="main"
          spaceBetween={40}
          pagination
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
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
                        const color =
                          entry.sal === value
                            ? "red"
                            : setChartColor(entry.dept_name);

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
        <SalaryFilter onClickFilter={onClickFilter} value={value} />
      </>
    );
  };

  return makeDeptChart(deptData, value);
});

export default DeptChart;

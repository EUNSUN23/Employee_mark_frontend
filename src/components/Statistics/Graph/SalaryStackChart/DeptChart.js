import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import { setChartColor } from "../../../../shared/utility";
import CustomizedLabel from "./CustomizedLabel";
import SalaryFilter from "./SalaryFilter";
import SlideNav from "../../../UI/SlideNav";

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10% 70%;
  align-content: top;
  grid-gap: 50px;
  .chartSwiper {
    width: 80%;
    @media only screen and (max-width: 992px) {
      width: 90%;
    }
    height: 400px;
  }
  .chartSlide {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
    grid-template-rows: auto;
  }
  .resContainer {
    margin: 0 auto;
  }
  .y-label {
    font-size: 14px;
    font-weight: bold;
  }
`;

const Header = styled.div`
  display: grid;
  height: 100px;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-content: center;
  h1 {
    font-size: 30px;
    text-align: center;
  }
  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 2fr 2fr 1fr;
    grid-template-rows: auto;
    font-size: 25px;
    h1 {
      font-size: 25px;
    }
  }
`;

SwiperCore.use([Navigation, Pagination]);

const DeptChart = ({ deptData }) => {
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

  const onClickForward = useCallback(() => {
    if (chartSwiper.isEnd) return setDisabledNav("forward");
    if (disabledNav === "backward") setDisabledNav(null);

    chartSwiper.slideNext();
  }, [chartSwiper, disabledNav]);

  const onClickBackward = useCallback(() => {
    if (chartSwiper.isBeginning) return setDisabledNav("backward");
    if (disabledNav === "forward") setDisabledNav(null);

    const snappedIndex = chartSwiper.snapIndex;
    chartSwiper.slideTo(snappedIndex - 1);
  }, [chartSwiper, disabledNav]);

  if (!deptData) return null;

  const result = Object.keys(deptData).map((dept, idx) => {
    const data = deptData[dept];
    return (
      <SwiperSlide key={`chart-${dept}`} className="charSlide">
        <ResponsiveContainer width="100%" height={380} className="resContainer">
          <BarChart data={data} margin={{ top: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sal" tick={false} />
            <YAxis dataKey="cnt" type="number" domain={[0, "dataMax+1000"]}>
              <Label
                value="*직원 수"
                offset={15}
                position="top"
                className="y-label"
              />
            </YAxis>

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
  });

  return (
    <Container>
      <Header>
        <SlideNav
          disabled={disabledNav}
          direction="backward"
          onClickNav={onClickBackward}
          ref={navigationPrevRef}
        />
        <h1 ref={paginationRef} className="swiperPagination"></h1>
        <SalaryFilter onClickFilter={onClickFilter} value={value} />
        <SlideNav
          disabled={disabledNav}
          direction="forward"
          onClickNav={onClickForward}
          ref={navigationNextRef}
        />
      </Header>
      <Swiper
        className="chartSwiper"
        ref={swiperRef}
        slidesPerView={1}
        id="main"
        spaceBetween={50}
        cssMode={true}
        centeredSlides={true}
        pagination={{
          el: ".swiperPagination",
          type: "custom",
          clickable: true,
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
        scrollbar={{ draggable: true }}
      >
        {result}
      </Swiper>
    </Container>
  );
};

export default DeptChart;

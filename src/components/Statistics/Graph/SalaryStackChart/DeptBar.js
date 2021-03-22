import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis } from "recharts";
import { Grid } from "@material-ui/core";
import ChartSelect from "../ChartSelect";
import { setChartColor } from "../../../../shared/utility";
import styled from "styled-components";

// const CustomLabel = props => {
//   console.log(props);
//   return (
//     <foreignObject class="label-wrapper" x={props.viewBox.x} y="0">
//       <div xmlns="http://www.w3.org/1999/xhtml" class="custom-label">
//         Label
//       </div>
//     </foreignObject>
//   );
// };

const CustomTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  console.log("tick", value);

  const tick = (
    <foreignObject width="20" height="20">
      <p xmlns="http://www.w3.org/1999/xhtml">{value}</p>
    </foreignObject>
  );

  console.log("props", tickProps);

  return tick;
};

const DeptBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [salary, setSalary] = useState(40000);
  const [checked, setChecked] = useState([
    "Customer Service",
    "Development",
    "Finance",
    "Human Resources",
    "Marketing",
    "Production",
    "Quality Management",
    "Research",
    "Sales",
  ]);
  const deptData = useSelector((state) => state.statPage.deptData);

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const chartSelectHandler = useCallback(
    (selected) => {
      setChecked(selected);
    },
    [setChecked]
  );

  const makeDeptBar = (salary) => {
    const data = deptData[salary];

    const arrangedData = Object.keys(data).map((dept, idx) => {
      return { name: dept, cnt: data[dept] };
    });

    const activeItem = arrangedData[activeIndex];

    return (
      <Grid item>
        <p>데이터 보기 : Bar 클릭</p>
        <p className="content">{`"${activeItem.name}"의 $${salary}연봉자 수 : ${activeItem.cnt}명`}</p>
        <BarChart width={800} height={350} data={arrangedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            fill="#666"
            tick={<CustomTick />}
          />
          <YAxis dataKey="cnt" />
          <Bar dataKey="cnt" onClick={handleClick}>
            {checked.map((entry, index) => {
              const color =
                index === activeIndex ? "#82ca9d" : setChartColor(entry);

              return (
                <Cell cursor="pointer" fill={color} key={`cell-${index}`} />
              );
            })}
          </Bar>
        </BarChart>
      </Grid>
    );
  };

  return deptData ? (
    <Grid container spacing={2} justify="center" alignItems="center">
      {makeDeptBar(salary)}
      <Grid item>
        <ChartSelect onCheckHandler={chartSelectHandler} checked={checked} />
      </Grid>
    </Grid>
  ) : null;
};

export default DeptBar;

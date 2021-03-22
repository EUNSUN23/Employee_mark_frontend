import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ChartSelect from "../ChartSelect";
import { setChartColor } from "../../../../shared/utility";

const data2 = [
  { salary: "$40000", cnt: 352, name: 부서명 },
  { salary: "$50000", cnt: 444 },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DeptBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
  const activeItem = data[activeIndex];

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

  const deptBar = (
    <Grid item>
      <p>데이터 보기 : Bar 클릭</p>
      <BarChart width={550} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="uv" />
        <Bar dataKey="uv" onClick={handleClick}>
          {checked.map((entry, index) => {
            const color =
              index === activeIndex ? "#82ca9d" : setChartColor(entry);

            return <Cell cursor="pointer" fill={color} key={`cell-${index}`} />;
          })}
        </Bar>
      </BarChart>
      <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p>
    </Grid>
  );

  return deptData ? (
    <Grid container spacing={2} justify="center">
      {deptBar}
      <Grid item>
        <ChartSelect onCheckHandler={chartSelectHandler} checked={checked} />
      </Grid>
    </Grid>
  ) : null;
};

export default DeptBar;

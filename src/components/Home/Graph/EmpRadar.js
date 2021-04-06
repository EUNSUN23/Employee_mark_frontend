import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../theme";
import CustomizedRadarTick from "./CustomizedRadarTick";
import CustomizedRadarLabel from "./CustomizedRadarLabel";
import CustomizedDot from "./CustomizedDot";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles(() => ({
  deptEmp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    animation: `$dept 20000ms 0s infinite ${theme.transitions.easing.easeInOut} `,
  },

  "@keyframes dept": {
    "0%": {
      transform: "translate(-50%,-50%)",
    },
    "3%": { transform: "translate(-50%,-50%)" },
    "20%": {
      transform: "translate(-50%,-50%)",
    },
    "30%": {
      transform: "translate(-50%,-50%)",
    },
    "40%": {
      transform: "translate(-50%,-50%)",
    },

    "50%": {
      transform: "translate(-50%,-50%)",
    },
    "55%": {
      transform: "translate(-200%,-50%)",
    },
    "60%": {
      transform: "translate(-200%,-50%)",
    },
    "70%": {
      transform: "translate(-200%,-50%)",
    },
    "80%": {
      transform: "translate(-200%,-50%)",
    },
    "90%": {
      transform: "translate(-200%,-50%)",
    },
    "100%": {
      transform: "translate(-200%,-50%)",
    },
  },
  titleEmp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    animation: `$title 20000ms 0s infinite ${theme.transitions.easing.easeInOut} `,
  },
  "@keyframes title": {
    "0%": { transform: "translate(200%,-50%)" },
    "10%": { transform: "translate(200%,-50%)" },
    "20%": { transform: "translate(200%,-50%)" },
    "30%": { transform: "translate(200%,-50%)" },
    "40%": { transform: "translate(200%,-50%)" },
    "50%": { transform: "translate(200%,-50%)" },
    "55%": { transform: "translate(-50%,-50%)" },
    "60%": { transform: "translate(-50%,-50%)" },
    "70%": { transform: "translate(-50%,-50%)" },
    "80%": { transform: "translate(-50%,-50%)" },
    "90%": { transform: "translate(-50%,-50%)" },
    "100%": { transform: "translate(-50%,-50%)" },
  },
}));

const EmpRadar = ({ data }) => {
  const [activeDept, setActiveDept] = useState("Development");
  const [activeTitle, setActiveTitle] = useState("Senior Engineer");
  const classes = useStyles();
  const deptEmp = data.dept;
  const titleEmp = data.title;

  const onMouseTick = (e, name) => {
    const { value } = e;

    name === "dept" ? setActiveDept(value) : setActiveTitle(value);
  };

  const onMouseLeaveTick = (e, name) => {
    name === "dept" ? setActiveDept(null) : setActiveTitle(null);
  };

  return (
    <>
      <ResponsiveContainer width="90%" height="90%" className={classes.deptEmp}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="90%"
          data={deptEmp}
          margin={{ top: 20, bottom: 30, left: 20, right: 20 }}
        >
          <PolarGrid />
          <PolarRadiusAxis datKey="count" />
          <PolarAngleAxis
            dataKey="dept_name"
            tick={
              <CustomizedRadarTick data={deptEmp} activeValue={activeDept} />
            }
            onMouseEnter={(e) => onMouseTick(e, "dept")}
            onMouseLeave={(e) => onMouseLeaveTick(e, "dept")}
          />

          <Radar
            name="Employees"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            dot={<CustomizedDot activeValue={activeDept} />}
            label={<CustomizedRadarLabel activeValue={activeDept} />}
          />
        </RadarChart>
      </ResponsiveContainer>
      <ResponsiveContainer
        width="90%"
        height="90%"
        className={classes.titleEmp}
      >
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="90%"
          data={titleEmp}
          margin={{ top: 20, bottom: 30, left: 20, right: 20 }}
        >
          <PolarGrid />
          <PolarRadiusAxis datKey="count" />
          <PolarAngleAxis
            dataKey="title"
            onMouseEnter={(e) => onMouseTick(e, "title")}
            onMouseLeave={(e) => onMouseLeaveTick(e, "title")}
            tick={
              <CustomizedRadarTick data={titleEmp} activeValue={activeTitle} />
            }
          />

          <Radar
            name="Employees"
            dataKey="count"
            stroke="green"
            fill="green"
            fillOpacity={0.6}
            dot={<CustomizedDot activeValue={activeTitle} />}
            label={<CustomizedRadarLabel activeValue={activeTitle} />}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default EmpRadar;

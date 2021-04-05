import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../theme";
import CustomizedRadarTick from "./CustomizedRadarTick";
import CustomizedRadarLabel from "./CustomizedRadarLabel";

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
    border: "1px solid blue",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    // animation: `$dept 10000ms 0s infinite ${theme.transitions.easing.easeOut} alternate`,
  },

  "@keyframes dept": {
    "0%": {
      opacity: 1,
    },
    "10%": { opacity: 1 },
    "20%": {
      opacity: 1,
    },
    "30%": {
      opacity: 1,
    },
    "40%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0,
    },
    "60%": {
      opacity: 0,
    },
    "70%": {
      opacity: 0,
    },
    "80%": {
      opacity: 0,
    },
    "90%": {
      opacity: 0,
    },
    "100%": {
      opacity: 0,
    },
  },
  titleEmp: {
    border: "1px solid blue",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    animation: `$title 10000ms 0s infinite ${theme.transitions.easing.easeIn} alternate`,
  },
  "@keyframes title": {
    "0%": {
      opacity: 0,
    },
    "10%": { opacity: 0 },
    "20%": {
      opacity: 0,
    },
    "30%": {
      opacity: 0,
    },
    "40%": {
      opacity: 0,
    },
    "50%": {
      opacity: 1,
    },
    "60%": {
      opacity: 1,
    },
    "70%": {
      opacity: 1,
    },
    "80%": {
      opacity: 1,
    },
    "90%": {
      opacity: 1,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

const EmpRadar = ({ data }) => {
  const [activeValue, setActiveValue] = useState();
  const classes = useStyles();
  const deptEmp = data.dept;
  const titleEmp = data.title;

  const onMouseTick = (e) => {
    const { value } = e;
    setActiveValue(value);
  };

  return (
    <>
      <ResponsiveContainer width="90%" height={450} className={classes.deptEmp}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="90%"
          data={deptEmp}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="dept_name"
            tick={
              <CustomizedRadarTick data={deptEmp} activeValue={activeValue} />
            }
            onMouseEnter={(e) => onMouseTick(e)}
          />

          <Radar
            name="Employees"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            // dot
            label={<CustomizedRadarLabel activeValue={activeValue} />}
          />
        </RadarChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer
        width="90%"
        height={450}
        className={classes.titleEmp}
      >
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="90%"
          data={titleEmp}
          margin={{ top: 50, bottom: 20, left: 20, right: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="title"
            tick={<CustomizedRadarTick data={titleEmp} />}
          />

          <Radar
            name="Employees"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer> */}
    </>
  );
};

export default EmpRadar;

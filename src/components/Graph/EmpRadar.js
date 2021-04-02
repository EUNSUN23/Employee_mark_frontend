import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles(() => ({
  resContainer: {
    border: "1px solid blue",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

const EmpRadar = ({ data }) => {
  const classes = useStyles();
  const deptEmp = data.dept;
  const titleEmp = data.title;

  return (
    <ResponsiveContainer
      width="90%"
      height={450}
      className={classes.resContainer}
    >
      <RadarChart
        cx="50%"
        cy={250}
        outerRadius="90%"
        data={deptEmp}
        margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="dept_name" />
        <PolarRadiusAxis />
        <Radar
          name="Employees"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default EmpRadar;

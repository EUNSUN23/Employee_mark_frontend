import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const useStyles = makeStyles(() => ({
  empChart: {
    margin: "0 auto",
  },
  label: {
    color: "#444",
  },
}));

const CustomTooltip = ({ active, payload, label }) => {
  const classes = useStyles();
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className={classes.label}>{`$${label} : ${payload[0].value}명`}</p>
      </div>
    );
  }

  return null;
};

const CustomizedXAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={18} textAnchor="middle" fill="#666" fontSize="13px">
        {`$${payload.value}`}
      </text>
    </g>
  );
};

const CustomizedYAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor="end" fill="#666" fontSize="13px">
        {`${payload.value}명`}
      </text>
    </g>
  );
};

const EmpChart = () => {
  const classes = useStyles();
  const empData = useSelector((state) => state.statPage.empData);
  return empData ? (
    <AreaChart
      className={classes.empChart}
      width={800}
      height={400}
      data={empData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="sal" tick={<CustomizedXAxisTick />} />
      <YAxis tick={<CustomizedYAxisTick />} />
      <Tooltip content={<CustomTooltip />} />
      <Area type="monotone" dataKey="cnt" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  ) : null;
};

export default EmpChart;

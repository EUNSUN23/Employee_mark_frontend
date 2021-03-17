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

const EmpChart = () => {
  const empData = useSelector((state) => state.statPage.empData);
  return (
    <AreaChart
      width={500}
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
      <XAxis dataKey="sal" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="cnt" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default EmpChart;

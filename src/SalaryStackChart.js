import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ChartSelect from "./ChartSelect";
import { Grid } from "@material-ui/core";

const SalaryStackChart = (props) => {
  const [chartData, setChartData] = useState();
  const [checked, setChecked] = useState();
  const { data } = props;

  const chartSelectHandler = (selected) => {
    setChecked(selected);
  };

  const createChartData = (resData) => {
    const arrangeData = (resData) => {
      const dataArr = [];

      for (let i = 0; i < 13; i++) {
        const salaryData = resData.filter(
          (data, idx) => data.sal === 40000 + 10000 * i
        );

        dataArr.push(salaryData);
      }
      return dataArr;
    };

    const arrangedData = arrangeData(resData);

    const sortedData = arrangedData.map((data, idx) => {
      const dataObj = new Set();
      const deptNameArr = data.map((data, idx) => {
        return data.dept_name;
      });
      dataObj.name = `${data[0].sal / 10000}만`;
      const dataCount = deptNameArr.length; //9,8,6..등
      for (let i = 0; i < dataCount; i++) {
        dataObj[deptNameArr[i]] = data[i].cnt;
      }

      return dataObj;
    });

    setChartData(sortedData);
  };

  useEffect(() => {
    if (!data) return;
    createChartData(data);
  }, []);

  return (
    <Grid container>
      <Grid item>
        <AreaChart
          width={650}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Customer Service"
            stroke="red"
            fillOpacity={0.5}
            fill="red"
          />
          <Area
            type="monotone"
            dataKey="Development"
            stroke="orange"
            fillOpacity={0.5}
            fill="orange"
          />
          <Area
            type="monotone"
            dataKey="Finance"
            stroke="salmon"
            fillOpacity={0.5}
            fill="salmon"
          />
          <Area
            type="monotone"
            dataKey="Human Resources"
            stroke="green"
            fillOpacity={0.5}
            fill="green"
          />
          <Area
            type="monotone"
            dataKey="Marketing"
            stroke="blue"
            fillOpacity={0.5}
            fill="blue"
          />
          <Area
            type="monotone"
            dataKey="Production"
            stroke="navy"
            fillOpacity={0.5}
            fill="navy"
          />
          <Area
            type="monotone"
            dataKey="Quality Management"
            stroke="purple"
            fillOpacity={0.5}
            fill="purple"
          />
          <Area
            type="monotone"
            dataKey="Research"
            stroke="skyblue"
            fillOpacity={0.5}
            fill="skyblue"
          />
          <Area
            type="monotone"
            dataKey="Sales"
            stroke="plum"
            fillOpacity={0.5}
            fill="plum"
          />
        </AreaChart>
      </Grid>

      <Grid item>
        <ChartSelect onCheckHandler={chartSelectHandler} checked={checked} />
      </Grid>
    </Grid>
  );
};

export default SalaryStackChart;

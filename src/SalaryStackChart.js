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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  initText: {
    fontSize: 60,
    color: "#e8e8e8",
    textAlign: "center",
    lineHeight: "250px",
    width: 650,
    height: 250,
    border: "1px solid #999999",
    borderRadius: "2px",
  },
}));

const SalaryStackChart = (props) => {
  const classes = useStyles();
  const [chartData, setChartData] = useState();
  const [checked, setChecked] = useState(["Customer Service"]);
  const { data } = props;

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
    console.log("SalaryStackChart____USE EFFECT", data);
    createChartData(data);
  }, [checked, data]);

  const chartSelectHandler = (selected) => {
    setChecked(selected);
  };

  const makeChart = () => {
    console.log("MAKE CHART____", "checked", checked, "chartData", chartData);
    if (checked.length === 0 || !chartData) return;
    const setChartColor = (chartName) => {
      console.log(chartName);
      let chartColor;
      switch (chartName) {
        case "Customer Service":
          chartColor = "red";
          return chartColor;
        case "Development":
          chartColor = "orange";
          return chartColor;
        case "Finance":
          chartColor = "salmon";
          return chartColor;
        case "Human Resources":
          chartColor = "green";
          return chartColor;
        case "Marketing":
          chartColor = "blue";
          return chartColor;
        case "Production":
          chartColor = "skyblue";
          return chartColor;
        case "Quality Management":
          chartColor = "purple";
          return chartColor;
        case "Research":
          chartColor = "plum";
          return chartColor;
        case "Sales":
          chartColor = "palegreen";
          return chartColor;
        default:
          return;
      }
    };

    let chart;

    chart = checked.map((data, idx) => {
      const color = setChartColor(data);
      const chartName = data;
      console.log("chartName", data, "color", color);
      return (
        <Area
          key={chartName}
          type="monotone"
          dataKey={chartName}
          stroke={color}
          fillOpacity={0.5}
          fill={color}
        />
      );
    });
    return chart;
  };

  console.log("CHECKED", checked, "ChartData", chartData);

  const content =
    checked.length > 0 && chartData ? (
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
          <YAxis type="number" domain={[0, 20000]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {makeChart()}
        </AreaChart>
      </Grid>
    ) : (
      <Grid item>
        <div className={classes.initText}>부서를 선택하세요</div>
      </Grid>
    );

  return (
    <Grid container spacing={2} className={classes.chartContainer}>
      {content}
      <Grid item>
        <ChartSelect onCheckHandler={chartSelectHandler} checked={checked} />
      </Grid>
    </Grid>
  );
};

export default SalaryStackChart;

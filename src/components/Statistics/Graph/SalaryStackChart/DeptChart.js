import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setChartColor } from "../../../../shared/utility";
import { makeStyles } from "@material-ui/core/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ChartSelect from "../../Graph/ChartSelect";

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

const DeptChart = () => {
  const [checked, setChecked] = useState(["Customer Service"]);
  const deptData = useSelector((state) => state.statPage.deptData);
  const classes = useStyles();

  const chartSelectHandler = (selected) => {
    setChecked(selected);
  };

  const makeChart = () => {
    console.log("MAKE CHART____", "checked", checked, "chartData", chartData);
    if (checked.length === 0 || !chartData) return;
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

  const content =
    checked.length > 0 && chartData ? (
      <Grid item>
        <AreaChart
          width={650}
          height={250}
          data={deptData}
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

export default DeptChart;

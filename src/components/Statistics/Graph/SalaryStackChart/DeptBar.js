import React, { useState, useCallback, memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Grid } from "@material-ui/core";
import DeptBarSlider from "./DeptBarSlider";
import { setChartColor } from "../../../../shared/utility";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedTick from "./CustomizedTick";
import CustomizedLabel from "./CustomizedLabel";

const useStyles = makeStyles((theme) => ({
  barChartGrid: {
    width: "100%",
    height: 380,
    [theme.breakpoints.only("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "60%",
    },
  },
}));

const DeptBar = () => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);
  const [salary, setSalary] = useState(40000);

  const category = useSelector(
    (state) => state.searchBar.category,
    shallowEqual
  );
  const deptData = useSelector(
    (state) => state.statPage.deptData,
    shallowEqual
  );

  const deptSlice = category ? category.dept.slice(1) : null;

  const onChangeSlider = useCallback(
    (e, sal) => {
      setSalary(sal);
    },
    [setSalary]
  );

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const makeDeptBar = () => {
    console.log("deptData", deptData);
    console.log("salary", salary);
    const data = deptData[salary];

    const arrangedData = Object.keys(data).map((dept, idx) => {
      return { name: dept, cnt: data[dept] };
    });

    const activeItem = arrangedData[activeIndex];

    return (
      <Grid item xs={11} className={classes.barChartGrid}>
        <ResponsiveContainer
          width="100%"
          height={380}
          style={{ border: "1px solid red" }}
        >
          <BarChart
            data={arrangedData}
            margin={{ top: 30, right: 5, bottom: 30, left: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              fill="#666"
              tick={<CustomizedTick data={data} />}
              tickLine={false}
            />
            <YAxis dataKey="cnt" allowDataOverflow={true} />

            <Bar
              dataKey="cnt"
              onClick={handleClick}
              label={<CustomizedLabel />}
            >
              {deptSlice.map((entry, index) => {
                const color = setChartColor(entry);
                const stroke = index === activeIndex ? "red" : "false";

                return (
                  <Cell
                    cursor="pointer"
                    fill={color}
                    key={`cell-${index}`}
                    stroke={stroke}
                    strokeWidth={2}
                    strokeDasharray="5,5"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    );
  };

  return deptData && category ? (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item></Grid>
      <DeptBarSlider handleChangeSlider={onChangeSlider} />

      {makeDeptBar()}
    </Grid>
  ) : null;
};

export default DeptBar;

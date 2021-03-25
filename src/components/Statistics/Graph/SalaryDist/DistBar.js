import React from "react";
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
import { setChartColor } from "../../../../shared/utility";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedTick from "../SalaryStackChart/CustomizedTick";
import CustomizedLabel from "../SalaryStackChart/CustomizedLabel";

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
  salary: {
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    textShadow: "2px 6px 4px #CECECE ",
    zIndex: 500,
    color: "#414352",
  },
}));

const DistBar = ({ data, type, salary }) => {
  const classes = useStyles();

  const category = useSelector(
    (state) => state.searchBar.category,
    shallowEqual
  );

  const makeDistBar = () => {
    const deptSlice = category ? category.dept.slice(1) : null;
    const distData = data.map((data, idx) => ({
      name: data.dept_name,
      cnt: data.cnt,
    }));

    console.log("makeDeptBar", distData, category);
    return (
      <Grid item xs={11} className={classes.barChartGrid}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={distData}
            margin={{ top: 60, right: 5, bottom: 30, left: 5 }}
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

            <Bar dataKey="cnt" label={<CustomizedLabel />}>
              {deptSlice.map((entry, index) => {
                const color = setChartColor(entry);

                return (
                  <Cell
                    fill={color}
                    key={`cell-${index}`}
                    stroke={false}
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

  const compare = type === "below" ? "<" : ">";

  return category ? (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        {" "}
        <h1 className={classes.salary}>{`Salary ${compare} ${salary}`}</h1>
      </Grid>
      {makeDistBar()}
    </Grid>
  ) : null;
};

export default DistBar;
import React, { Component } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "victory";
import styles from "./Chart.module.css";

const result = {
  packet: [
    {
      emp_no: 10031,
      salary: 40000,
      from_date: "1991-08-31T15:00:00.000Z",
      to_date: "1992-08-31",
    },
    {
      emp_no: 10031,
      salary: 40859,
      from_date: "1992-08-30T15:00:00.000Z",
      to_date: "1993-08-31",
    },
    {
      emp_no: 10031,
      salary: 41881,
      from_date: "1993-08-30T15:00:00.000Z",
      to_date: "1994-08-31",
    },
    {
      emp_no: 10031,
      salary: 44191,
      from_date: "1994-08-30T15:00:00.000Z",
      to_date: "1995-08-31",
    },
    {
      emp_no: 10031,
      salary: 47202,
      from_date: "1995-08-30T15:00:00.000Z",
      to_date: "1996-08-30",
    },
    {
      emp_no: 10031,
      salary: 47606,
      from_date: "1996-08-29T15:00:00.000Z",
      to_date: "1997-08-30",
    },
    {
      emp_no: 10031,
      salary: 50810,
      from_date: "1997-08-29T15:00:00.000Z",
      to_date: "1998-08-30",
    },
    {
      emp_no: 10031,
      salary: 52675,
      from_date: "1998-08-29T15:00:00.000Z",
      to_date: "1999-08-30",
    },
    {
      emp_no: 10031,
      salary: 54177,
      from_date: "1999-08-29T15:00:00.000Z",
      to_date: "2000-08-29",
    },
    {
      emp_no: 10031,
      salary: 53873,
      from_date: "2000-08-28T15:00:00.000Z",
      to_date: "2001-08-29",
    },
    {
      emp_no: 10031,
      salary: 56689,
      from_date: "2001-08-28T15:00:00.000Z",
      to_date: "present",
    },
  ],
};

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      interpolation: "linear",
      polar: false,
    };
  }

  // data = [
  //     { x: 0, y: 0 },
  //     { x: 1, y: 2 },
  //     { x: 2, y: 1 },
  //     { x: 3, y: 4 },
  //     { x: 4, y: 3 },
  //     { x: 5, y: 5 },
  //   ];

  data = result.packet.map((salary, idx) => {
    return {
      x: salary.from_date.slice(0, 4),
      y: salary.salary,
    };
  });

  lastValue = this.data[this.data.length - 1].y;

  render() {
    return (
      <div className={styles.Chart}>
        <VictoryChart polar={this.state.polar} height={300}>
          <VictoryLine
            interpolation={this.state.interpolation}
            data={this.data}
            style={{ data: { stroke: "#c43a31" } }}
          />
          <VictoryScatter
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.y === this.lastValue ? "#000000" : "#c43a31",
                stroke: ({ datum }) =>
                  datum.y === this.lastValue ? "#000000" : "#c43a31",
                fillOpacity: 0.7,
                strokeWidth: 3,
              },
              labels: {
                fontSize: 15,
                fill: ({ datum }) =>
                  datum.y === this.lastValue ? "#000000" : "#c43a31",
              },
            }}
            size={9}
            data={this.data}
            labels={({ datum }) => datum.y}
          />
          <VictoryAxis
            dependentAxis
            style={
              {
                //   axis: { stroke: "transparent" },
                //   ticks: { stroke: "transparent" },
                //   tickLabels: { fill: "transparent" },
              }
            }
            tickValues={[30000, 50000, 70000, 90000, 110000]}
          />
          <VictoryAxis />
        </VictoryChart>
      </div>
    );
  }
}

export default Chart;

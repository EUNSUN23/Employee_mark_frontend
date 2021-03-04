import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "victory";
import styles from "./SalaryHistory.module.css";

const SalaryHistory = (props) => {
  const { data } = props;

  console.log(data);

  const chartData = data.salary.map((salary, idx) => {
    return {
      x: salary.from_date.slice(0, 4),
      y: salary.salary,
    };
  });
  const firstValue = chartData[0].y;
  const lastValue = chartData[chartData.length - 1].y;

  return (
    <div className={styles.Chart}>
      <VictoryChart height={200}>
        <VictoryLine
          interpolation="linear"
          data={chartData}
          style={{ data: { stroke: "#b3b3b3" } }}
        />
        <VictoryScatter
          style={{
            data: {
              fill: ({ datum }) => {
                let color;
                if (datum.y === firstValue) {
                  color = "red";
                } else if (datum.y === lastValue) {
                  color = "green";
                } else {
                  color = "#999999";
                }
                return color;
              },

              stroke: ({ datum }) =>
                datum.y === lastValue ? "green" : "#e8e8e8",
              fillOpacity: 1,
              strokeWidth: 1,
            },
            labels: {
              fontSize: 13,
              fontWeight: "bold",
              fill: ({ datum }) =>
                datum.y === firstValue || datum.y === lastValue
                  ? "#000000"
                  : "#d3d3d3",
            },
          }}
          size={9}
          data={chartData}
          labels={({ datum }) => datum.y}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fill: "transparent" },
          }}
          tickValues={[30000, 70000, 110000]}
        />
        <VictoryAxis />
      </VictoryChart>
    </div>
  );
};

export default SalaryHistory;

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SalaryStackChart = (props) => {
  const [chartData, setChartData] = useState();
  const [maxCnt, setMaxCnt] = useState();
  const { data } = props;

  useEffect(() => {
    if (!data) return;
    createChartData(data);
  }, []);

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
    let cntData = [];
    const sortedData = arrangedData.map((data, idx) => {
      const dataObj = new Set();
      const deptNameArr = data.map((data, idx) => {
        return data.dept_name;
      });
      dataObj.name = `${data[0].sal / 10000}만`;
      const dataCount = deptNameArr.length; //9,8,6..등
      for (let i = 0; i < dataCount; i++) {
        dataObj[deptNameArr[i]] = data[i].cnt;
        cntData.push(data[i].cnt);
      }

      return dataObj;
    });

    const max = cntData.sort((a, b) => a - b)[cntData.length - 1];

    const ceiledMax = Math.ceil(max / 10000) * 10000;

    setMaxCnt(ceiledMax);
    setChartData(sortedData);
  };

  return (
    <AreaChart
      width={500}
      height={400}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      {/* <YAxis type="number" domain={[0, "dataMax/5"]} /> */}
      <Tooltip />
      <Area
        type="monotone"
        dataKey="Customer Service"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="Development"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Area
        type="monotone"
        dataKey="Finance"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
      <Area
        type="monotone"
        dataKey="Human Resources"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
      <Area
        type="monotone"
        dataKey="Marketing"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
      <Area
        type="monotone"
        dataKey="Production"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
      <Area
        type="monotone"
        dataKey="Quality Management"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />{" "}
      <Area
        type="monotone"
        dataKey="Research"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />{" "}
      <Area
        type="monotone"
        dataKey="Sales"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </AreaChart>
  );
};

export default SalaryStackChart;

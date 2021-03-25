import React, { useState } from "react";
import { setChartColor } from "../../../../shared/utility";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { shallowEqual, useSelector } from "react-redux";

const DeptBar = ({ deptData }) => {
  const [dept, setDept] = useState("Customer Service");

  const onClickTab = (dept) => {
    setDept(dept);
  };

  const makeDeptBar = () => {
    if (!deptData) return null;
    const data = deptData.dept;
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="salary" />
        <YAxis dataKey="cnt" />

        <Bar dataKey="cnt" fill="#8884d8">
          {data.map((entry, index) => {
            const color = setChartColor(dept);
            return (
              <Cell
                fill={color}
                key={`cell-${index}`}
                stroke={false}
                strokeDasharray="5,5"
              />
            );
          })}
        </Bar>
      </BarChart>
    );
  };

  return makeDeptBar();
};

export default DeptBar;

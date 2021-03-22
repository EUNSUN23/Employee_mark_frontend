import "./styles.css";
import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis } from "recharts";

const data2 = [
  { name: "$40000", CustomerService: 352 },
  { name: "$50000", HumanResources: 444 },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DeptBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      <p>Click each rectangle </p>
      <BarChart width={550} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="uv" />
        <Bar dataKey="uv" onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p>
    </div>
  );
};

export default DeptBar;

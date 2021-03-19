import "./styles.css";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const data = [
  [
    { dept_name: "Development", count: 76958 },
    { dept_name: "Sales", count: 46922 },
    { dept_name: "Production", count: 66675 },
    { dept_name: "Human Resources", count: 16071 },
    { dept_name: "Research", count: 19285 },
    { dept_name: "Quality Management", count: 18295 },
    { dept_name: "Customer Service", count: 21813 },
    { dept_name: "Marketing", count: 18426 },
    { dept_name: "Finance", count: 15579 },
  ],
];

const EmpRadar = () => {
  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="dept_name" />
      <PolarRadiusAxis />
      <Radar
        name="Employees"
        dataKey="count"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default EmpRadar;

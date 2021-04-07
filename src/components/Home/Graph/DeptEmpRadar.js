import React, { useState } from "react";
import CustomizedRadarTick from "./CustomizedRadarTick";
import CustomizedRadarLabel from "./CustomizedRadarLabel";
import CustomizedDot from "./CustomizedDot";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const DeptEmpRadar = ({ deptEmp }) => {
  const [activeDept, setActiveDept] = useState("Development");
  const onMouseTick = (e, name) => {
    const { value } = e;

    setActiveDept(value);
  };

  const onMouseLeaveTick = (e, name) => {
    setActiveDept(null);
  };

  return (
    <ResponsiveContainer width="100%" height="90%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="90%"
        data={deptEmp}
        margin={{ top: 20, bottom: 65, left: 20, right: 20 }}
      >
        <PolarGrid />
        <PolarRadiusAxis datKey="count" />
        <PolarAngleAxis
          dataKey="dept_name"
          tick={<CustomizedRadarTick data={deptEmp} activeValue={activeDept} />}
          onMouseEnter={(e) => onMouseTick(e, "dept")}
          onMouseLeave={(e) => onMouseLeaveTick(e, "dept")}
        />

        <Radar
          name="Employees"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
          dot={<CustomizedDot activeValue={activeDept} />}
          label={<CustomizedRadarLabel activeValue={activeDept} />}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default DeptEmpRadar;

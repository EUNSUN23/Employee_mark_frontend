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

const TitleEmpRadar = ({ titleEmp }) => {
  const [activeTitle, setActiveTitle] = useState("Senior Engineer");
  const onMouseTick = (e, name) => {
    const { value } = e;
    setActiveTitle(value);
  };

  const onMouseLeaveTick = (e, name) => {
    setActiveTitle(null);
  };

  return (
    <ResponsiveContainer width="100%" height="90%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="90%"
        data={titleEmp}
        margin={{ top: 20, bottom: 65, left: 20, right: 20 }}
      >
        <PolarGrid />
        <PolarRadiusAxis datKey="count" />
        <PolarAngleAxis
          dataKey="title"
          onMouseEnter={(e) => onMouseTick(e, "title")}
          onMouseLeave={(e) => onMouseLeaveTick(e, "title")}
          tick={
            <CustomizedRadarTick data={titleEmp} activeValue={activeTitle} />
          }
        />

        <Radar
          name="Employees"
          dataKey="count"
          stroke="green"
          fill="green"
          fillOpacity={0.6}
          dot={<CustomizedDot activeValue={activeTitle} />}
          label={<CustomizedRadarLabel activeValue={activeTitle} />}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default TitleEmpRadar;

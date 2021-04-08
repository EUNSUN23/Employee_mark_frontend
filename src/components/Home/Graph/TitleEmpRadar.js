import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
  const overMd = useMediaQuery("(min-width:768px)");
  const outerR = overMd ? "100%" : "70%";

  const onMouseTick = (e, name) => {
    const { value } = e;
    setActiveTitle(value);
  };

  const onMouseLeaveTick = (e, name) => {
    setActiveTitle(null);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius={outerR}
        data={titleEmp}
        margin={{ top: 5, bottom: 85, left: 40, right: 40 }}
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

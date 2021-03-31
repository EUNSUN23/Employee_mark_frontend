import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import SalaryFilter from "./SalaryFilter";
import styled from "styled-components";
import CustomizedPieLabel from "./CustomizedPieLabel";

const Filter = styled.div`
  position: absolute;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SalaryLabel = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #333;
  text-shadow: 1px 2px 0px #d6d6dd;
`;

const EmpLabel = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: #333;
  top: 0;
  padding-left: ${(props) => props.cos < 0 && "100px"};
  text-shadow: 1px 2px 0px #d6d6dd;
`;

const COLOR = [
  "#E0CFEE",
  "#C8A9E1",
  "#B084D3",
  "#9860C4",
  " #7F42AF",
  "#7240B1",
  "#643795",
  "#5A338A",
  "#432871 ",
  "#4B2A6F ",
  "#2D1B4B ",
  "#170E25 ",
  "#000000",
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 20) * cos;
  const sy = cy + (outerRadius + 20) * sin;
  const mx = cx + (outerRadius + 40) * cos;
  const my = cy + (outerRadius + 40) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 40;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  console.log("pay", payload.emp, cx, cy);

  return (
    <g>
      <defs>
        <filter id="f1" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="5" dy="-2" />
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0.4 0.2 0 0 0 0 0 1 0"
          />
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 20}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="url(#f1)"
        // stroke="transparent"
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        strokeWidth={1}
        fill="none"
      />
      <circle
        cx={ex}
        cy={ey}
        r={4}
        fill={fill}
        stroke="#FFF"
        strokeWidth={2}
        textAnchor={textAnchor}
      />
      <foreignObject
        x={ex + (cos > 0 ? 0.8 : -9) * 12}
        y={ey - 25}
        width="100"
        height="40"
        textAnchor={textAnchor}
      >
        <EmpLabel xmlns="http://www.w3.org/1999/xhtml">
          {`${payload.emp}명`}
        </EmpLabel>
      </foreignObject>
      <text
        x={ex + (cos > 0 ? 2 : -2) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
      <foreignObject
        x={cx - 40}
        y={cy - 20}
        width="300"
        height="50"
        textAnchor={textAnchor}
      >
        <SalaryLabel xmlns="http://www.w3.org/1999/xhtml">
          {payload.sal}
        </SalaryLabel>
      </foreignObject>
    </g>
  );
};

const EmpPie = ({ empData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [value, setValue] = useState(40000);

  const onClickFilter = useCallback(
    (icon) => {
      const newValue = icon === "up" ? value + 10000 : value - 10000;
      if (newValue <= 160000 && newValue >= 40000) {
        const index = newValue === 40000 ? 0 : (newValue - 40000) / 10000;
        setValue(newValue);
        setActiveIndex(index);
      }
    },
    [value]
  );

  if (!empData) return null;

  return (
    <>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart margin={{ top: 60, bottom: 60 }}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={empData}
              dataKey="emp"
              innerRadius="65%"
              outerRadius="100%"
              stroke="none"
              paddingAngle="5"
              label={<CustomizedPieLabel activeIndex={activeIndex} />}
              labelLine={false}
            >
              {empData.map((data, index) => {
                console.log(COLOR[index]);
                return <Cell key={`salary-${data.sal}`} fill={COLOR[index]} />;
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Filter>
          <SalaryFilter value={value} onClickFilter={onClickFilter} />
        </Filter>
      </ChartContainer>
    </>
  );
};

export default EmpPie;

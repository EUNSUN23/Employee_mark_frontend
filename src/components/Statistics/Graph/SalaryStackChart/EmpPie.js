import React, { useCallback, useState, memo } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import SalaryFilter from "./SalaryFilter";
import styled from "styled-components";
import CustomizedPieLabel from "./CustomizedPieLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Filter = styled.div`
  position: absolute;
  height: 50px;
  left: 50%;
  top: ${(props) => (props.overLg ? "50%" : "45%")};
  transform: translate(-50%, -50%);
  .value,
  .title {
    color: "#222" : "#E20830";
  }
`;

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EmpLabel = styled.span`
  font-size: 23px;
  font-weight: bold;
  width: 120px;
  text-align: center;
  color: #333;
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

const ActiveShape = (props) => {
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
    overLg,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (overLg ? outerRadius - 10 : outerRadius) * cos;
  const sy = cy + (overLg ? outerRadius - 10 : outerRadius) * sin;
  const mx = cx + (overLg ? outerRadius + 20 : outerRadius) * cos;
  const my = cy + (overLg ? outerRadius + 30 : outerRadius) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * (overLg ? 35 : -2);
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  const empX = overLg ? ex + (cos > 0 ? 0.8 : -9) * 12 : cx - 30;
  const empY = overLg ? ey - 25 : cy + 20;
  const percentX = overLg
    ? ex + (cos > 0 ? 2 : -2) * 12
    : cos > 0
    ? cx - 30
    : cx + 40;
  const percentY = overLg ? ey : cy + 50;
  const activeFill = "#E20830";

  const circle = overLg ? (
    <circle
      cx={ex}
      cy={ey}
      r={4.5}
      fill={activeFill}
      stroke="#FFF"
      strokeWidth={2}
      textAnchor={textAnchor}
    />
  ) : null;

  return (
    <g>
      <defs>
        <filter id="f1" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="5" dy="2" />
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
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={activeFill}
        filter="url(#f1)"
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={activeFill}
        strokeWidth={2}
        fill="none"
      />
      {circle}
      <foreignObject
        x={empX}
        y={empY}
        width="100"
        height="40"
        textAnchor={textAnchor}
      >
        <EmpLabel xmlns="http://www.w3.org/1999/xhtml">
          {`${payload.emp}명`}
        </EmpLabel>
      </foreignObject>
      <text
        x={percentX}
        y={percentY}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const EmpPie = memo(({ empData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [value, setValue] = useState(null);
  const overLg = useMediaQuery("(min-width:992px)");

  const onClickFilter = useCallback(
    (icon) => {
      const goReverse = (icon) => {
        if (icon === "up") {
          setValue(40000);
          setActiveIndex(0);
        } else {
          setValue(160000);
          setActiveIndex(12);
        }
      };

      const go = (icon) => {
        let nextValue;
        if (icon === "up") {
          nextValue = value ? value + 10000 : 50000;
        } else {
          nextValue = value ? value - 10000 : 160000;
        }
        setValue(nextValue);
        setActiveIndex((nextValue - 40000) / 10000);
      };

      switch (icon) {
        case "up":
          return value === 160000 ? goReverse("up") : go("up");
        case "down":
          return value === 40000 ? goReverse("down") : go("down");
      }
    },
    [value]
  );

  if (!empData) return null;

  const cell = empData.map((data, index) => {
    return <Cell key={`salary-${data.sal}`} fill={COLOR[index]} />;
  });
  return (
    <>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart margin={{ top: 60, bottom: 60 }}>
            <Pie
              activeIndex={activeIndex}
              activeShape={<ActiveShape overLg={overLg} />}
              data={empData}
              dataKey="emp"
              innerRadius="65%"
              outerRadius="100%"
              stroke="none"
              paddingAngle="5"
              label={
                <CustomizedPieLabel
                  activeIndex={activeIndex}
                  salary={value}
                  overLg={overLg}
                />
              }
              labelLine={false}
            >
              {cell}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Filter overLg={overLg}>
          <SalaryFilter
            value={value ? value : 40000}
            onClickFilter={onClickFilter}
          />
        </Filter>
      </ChartContainer>
    </>
  );
});

export default EmpPie;

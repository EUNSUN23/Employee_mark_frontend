import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { setChartColor } from "../../../../shared/utility";
import CustomizedTick from "./CustomizedTick";
import Label from "./Label";

const ChartContainer = styled.article`
  width: 100%;
  height: 380;
  @media only screen and (min-width: 576px) and (max-width: 786px) {
    width: 80%;
  }
  @media only screen and (max-width: 576px) {
    width: 60%;
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 8%;
  @media only screen and (max-width: 786px) {
    top: 15%;
  }
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 2px 6px 4px #cecece;
  z-index: 500;
  color: #000;
  font-size: 3vw;
`;

const DistBar = memo(({ data, type, salary }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onChangeTick = useCallback(
    (index) => {
      console.log("click");
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const makeDistBar = (data) => {
    return (
      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 60, right: 30, bottom: 30, left: 5 }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis
              dataKey="name"
              interval={0}
              fill="#666"
              tick={
                <CustomizedTick
                  data={data}
                  onChangeTick={onChangeTick}
                  activeIndex={activeIndex}
                />
              }
              tickLine={false}
              allowDataOverflow={true}
            />
            <YAxis
              dataKey="cnt"
              type="number"
              domain={[0, (dataMax) => dataMax + parseInt(dataMax / 10)]}
            />

            <Bar
              dataKey="cnt"
              label={<Label activeIndex={activeIndex} />}
              allowDataOverflow={true}
            >
              {data.map((entry, index) => {
                const color = setChartColor(entry.name);
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
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  const compare = type === "below" ? "<" : ">";

  return (
    <>
      <Title>{`Salary ${compare} ${salary}`}</Title>
      {makeDistBar(data)}
    </>
  );
});

export default DistBar;

import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";

const PieLabel = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => props.color};
  //   border: 1px solid black;
`;

const CustomizedPieLabel = memo(
  (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      outerRadius,
      payload,
      activeIndex,
      index,
      value,
    } = props;

    const cos = Math.cos(-RADIAN * midAngle);
    const sin = Math.sin(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 0) * cos;
    const sy = cy + (outerRadius + 0) * sin;
    const mx = cx + (outerRadius + 10) * cos;
    const my = cy + (outerRadius + 10) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    console.log("label render");

    if (activeIndex === index) return null;

    return (
      <g>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke="#BFBFBF"
          strokeWidth={1}
          fill="none"
        />
        <foreignObject
          x={ex + (cos > 0 ? 0.5 : -4.5) * 12}
          y={ey - (cos > 0 ? 15 : 15)}
          width="100"
          height="20"
          textAnchor={textAnchor}
        >
          <PieLabel color="#BFBFBF ">{`sal. ${payload.sal}`}</PieLabel>
        </foreignObject>
      </g>
    );
  },
  (prevProps, nextProps) => {
    return !nextProps.salary;
  }
);
export default CustomizedPieLabel;

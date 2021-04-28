import React, { memo } from "react";
import styled from "styled-components";

const PieLabel = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const CustomizedPieLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, payload } = props;

  const cos = Math.cos(-RADIAN * midAngle);
  const sin = Math.sin(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 0) * cos;
  const sy = cy + (outerRadius + 0) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke="#BFBFBF"
        strokeWidth={1}
        fill="none"
      />
      <foreignObject
        x={ex + (cos > 0 ? 0.5 : -3) * 12}
        y={ey - (cos > 0 ? 15 : 15)}
        width="100"
        height="20"
        textAnchor={textAnchor}
      >
        <PieLabel color="#BFBFBF ">{`${payload.sal}`}</PieLabel>
      </foreignObject>
    </g>
  );
};

export default memo(CustomizedPieLabel, (prevProps, nextProps) => {
  return prevProps.salary === nextProps.salary || nextProps.salary === null;
});

import React, { useMemo } from "react";

import styled from "styled-components";

export const Label = styled.div`
  color: #222;
  position: ${(props) => props.expand && "absolute"};
  font-size: ${(props) => (props.expand ? "12px" : "10px")};
  border: ${(props) => `1.5px solid ${props.fill}`};
  padding: ${(props) => props.expand && "5px"};
  background-color: ${(props) => props.expand && "white"};
  box-shadow: ${(props) =>
    props.expand &&
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"};
  border-radius: 1px;
`;

export const Title = styled.h6`
  padding: 0px;
  margin: 0 0 2px 0;
`;

const CustomizedLabel = (props) => {
  const { x, y, fill, value, viewBox } = props;
  const { width } = viewBox;

  const makeIndicator = (width, x, y, fill) => {
    const expand = width >= 45;
    const point = expand
      ? `${x} ${y}, ${x + 15} ${y - 20}, ${x + 40} ${y - 20}`
      : `${x} ${y}`;
    const r = expand ? 4 : 3.5;
    return (
      <g>
        <polyline
          points={point}
          stroke={fill}
          fill="transparent"
          strokeWidth="1"
        />
        <circle cx={x} cy={y} r={r} fill={fill} stroke="#fff" strokeWidth="2" />
      </g>
    );
  };

  const makeLabel = (width, fill, value) => {
    const expand = width >= 45;
    const textXPoint = expand ? x + 28 : x;
    const textYPoint = expand ? y - 35 : y - 17;
    const labelFill = expand ? fill : null;

    const label = (
      <foreignObject x={textXPoint} y={textYPoint} width="100" height="100">
        <Label
          xmlns="http://www.w3.org/1999/xhtml"
          fill={labelFill}
          expand={expand}
        >
          <Title xmlns="http://www.w3.org/1999/xhtml">{value}명</Title>
        </Label>
      </foreignObject>
    );
    return label;
  };

  return (
    <>
      <g>
        {makeIndicator(width, x, y, fill)}
        {makeLabel(width, fill, value)}
      </g>
    </>
  );
};

export default CustomizedLabel;

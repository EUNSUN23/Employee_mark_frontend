import React, { useMemo } from "react";
import styled from "styled-components";

const Label = styled.div`
  color: #222;
  position: absolute;
  font-size: 12px;
  border: ${(props) => `1.5px solid ${props.fill}`};
  padding: 5px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 1px;
`;

const Title = styled.h6`
  padding: 0px;
  margin: 0 0 2px 0;
`;

const CustomizedLabel = (props) => {
  const { x, y, fill, value, viewBox } = props;
  const { width } = viewBox;
  console.log("CustomizedLabel", props);

  const makeIndicator = (width, x, y, fill) => {
    const point =
      width >= 40
        ? `${x} ${y}, ${x + 15} ${y - 20}, ${x + 40} ${y - 20}`
        : `${x} ${y}, ${x + 10} ${y - 10}, ${x + 10} ${y - 10}`;
    return (
      <g>
        <polyline
          points={point}
          stroke={fill}
          fill="transparent"
          strokeWidth="1"
        />
        <circle cx={x} cy={y} r={4} fill={fill} stroke="#fff" strokeWidth="2" />
      </g>
    );
  };

  const textXPoint = width >= 40 ? x + 20 : x + 2;
  const textYPoint = width >= 40 ? y - 35 : y - 28;
  const labelFill = width >= 40 ? fill : null;

  return (
    <>
      <g>
        {makeIndicator(width, x, y, fill)}
        <foreignObject x={textXPoint} y={textYPoint} width="100" height="100">
          <Label xmlns="http://www.w3.org/1999/xhtml" fill={labelFill}>
            <Title xmlns="http://www.w3.org/1999/xhtml">{value}명</Title>
          </Label>
        </foreignObject>
      </g>
    </>
  );
};

export default CustomizedLabel;

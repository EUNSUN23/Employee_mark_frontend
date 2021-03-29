import React from "react";

import styled from "styled-components";

const Label = styled.div`
  color: #222;
  position: ${(props) => props.expand && "absolute"};
  font-size: ${(props) => (props.expand ? "12px" : "10px")};
  border: ${(props) => `1.5px solid ${props.fill}`};
  padding: ${(props) => props.expand && "5px"};
  background-color: ${(props) => props.expand && "#ffffff"};
  box-shadow: ${(props) =>
    props.expand &&
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"};
  border-radius: 1px;
`;

const Title = styled.h6`
  padding: 0px;
  margin: 0 0 2px 0;
`;

const Highlight = styled.div`
  color: #222;
  font-size: 23px;
  text-shadow: 1px 2px 0px #d6d6dd;
`;

const CustomizedLabel = (props) => {
  const { x, y, fill, value, viewBox, index, currentVal } = props;
  const { width } = viewBox;

  const makeIndicator = (width, x, y, fill) => {
    const expand = width >= 45;
    const point = expand
      ? `${x} ${y}, ${x + 10} ${y - 20}, ${x + 40} ${y - 20}`
      : `${x} ${y}`;
    const r = expand ? 4 : 0;
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

  const makeLabel = (width, fill, value, index, currentVal) => {
    const expand = width >= 45;
    const textXPoint = expand ? x + 20 : x + 5;
    const textYPoint = expand ? y - 35 : y - 17;
    const labelFill = expand ? fill : null;

    const salary = 40000 + 10000 * index;
    const highlight = salary === currentVal;

    let label;
    if (!highlight) {
      label = (
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
    } else {
      label = (
        <foreignObject x={x} y={y - 25} width="100" height="100">
          <Highlight
            xmlns="http://www.w3.org/1999/xhtml"
            fill={labelFill}
            expand={expand}
          >
            <Title xmlns="http://www.w3.org/1999/xhtml">{value}명</Title>
          </Highlight>
        </foreignObject>
      );
    }

    return label;
  };

  return (
    <>
      <g>
        {makeIndicator(width, x, y, fill)}
        {makeLabel(width, fill, value, index, currentVal)}
      </g>
    </>
  );
};

export default CustomizedLabel;

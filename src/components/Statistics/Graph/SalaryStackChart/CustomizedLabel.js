import React, { memo } from "react";
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

const CustomizedLabel = memo((props) => {
  console.log("label", props);
  const { name, x, y, fill, value, viewBox } = props;
  const { width } = viewBox;
  const mh = (width / 2).toFixed();

  const cx = x + mh;

  //name :부서이름, fill: bar색깔, value:직원수
  const point =
    name === "Sales"
      ? `${cx} ${y}, ${x - 40} ${y - 40}, ${x - 50} ${y - 40}`
      : `${cx} ${y}, ${x + 20} ${y - 30}, ${x + 50} ${y - 30}`;

  const textXPoint = name === "Sales" ? x - 50 : x + 50;
  return (
    <g transform={`translate(${mh},0)`}>
      <polyline
        points={point}
        stroke={fill}
        fill="transparent"
        stroke-width="1"
      />
      <circle cx={cx} cy={y} r={4} fill={fill} stroke="#fff" stroke-width="2" />

      <foreignObject x={textXPoint} y={y - 40} width="140" height="100">
        <Label xmlns="http://www.w3.org/1999/xhtml" fill={fill}>
          <Title xmlns="http://www.w3.org/1999/xhtml">{name}</Title>
          {`${value}명`}
        </Label>
      </foreignObject>
    </g>
  );
});

export default CustomizedLabel;

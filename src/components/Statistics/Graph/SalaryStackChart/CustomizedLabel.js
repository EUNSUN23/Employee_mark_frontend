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
  const { x, y, fill, value, viewBox, index, activeIndex } = props;
  const { width } = viewBox;
  const mh = (width / 2).toFixed();
  console.log("label", props);
  console.log("index", index, activeIndex);
  const cx = x + mh;

  //name :부서이름, fill: bar색깔, value:직원수
  const point = `${cx} ${y}, ${x + 15} ${y - 20}, ${x + 40} ${y - 20}`;

  return (
    <>
      <g>
        <polyline
          points={point}
          stroke={fill}
          fill="transparent"
          stroke-width="1"
        />
        <circle
          cx={cx}
          cy={y}
          r={4}
          fill={fill}
          stroke="#fff"
          stroke-width="2"
        />

        <foreignObject x={x + 30} y={y - 35} width="100" height="100">
          <Label xmlns="http://www.w3.org/1999/xhtml" fill={fill}>
            <Title xmlns="http://www.w3.org/1999/xhtml">{value}명</Title>
          </Label>
        </foreignObject>
      </g>
    </>
  );
});

export default CustomizedLabel;

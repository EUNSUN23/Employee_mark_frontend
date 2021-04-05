import React, { memo } from "react";
import styled from "styled-components";

const Label = styled.div`
  font-size: 12px;
  color: #222;
  font-weight: bold;
  width: 50px;
  height: 20px;
  position: relative;
  padding-right: 10px;
`;

const InnerLabel = styled.div`
  position: absolute;
  display: ${(props) => (props.activeValue === props.name ? "block" : "none")};
  left: 40%;

  transform: translateX(-50%);
`;

const CustomizedRadarLabel = (props) => {
  const { x, y, cx, cy, angle, radius, value, name, activeValue } = props;
  console.log("label", props);

  const XPoint = radius <= 90 ? x - radius / 2 : x - (180 - radius) / 2;

  return (
    <foreignObject x={XPoint} y={y} width="50" height="20">
      <Label>
        <InnerLabel activeValue={activeValue} name={name}>
          {value}명
        </InnerLabel>
      </Label>
    </foreignObject>
  );
};

export default CustomizedRadarLabel;

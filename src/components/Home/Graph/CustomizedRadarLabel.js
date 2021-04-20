import React from "react";
import styled from "styled-components";

const Label = styled.div`
  width: 100px;
  height: 20px;
  position: relative;
`;

const InnerLabel = styled.div`
  font-size: 15px;

  font-weight: bold;
  position: absolute;
  display: ${(props) => (props.activeValue === props.name ? "block" : "none")};
  left: 40%;
  padding-right: 15px;
  text-shadow: 2px 2px 1px #cecece;
  transform: translateX(-50%);
`;

const CustomizedRadarLabel = (props) => {
  const { x, y, radius, value, name, activeValue } = props;

  const XPoint = radius <= 90 ? x - radius : x - (180 - radius) / 2;

  return (
    <foreignObject x={XPoint} y={y} width="100" height="20">
      <Label>
        <InnerLabel activeValue={activeValue} name={name}>
          {value}명
        </InnerLabel>
      </Label>
    </foreignObject>
  );
};

export default CustomizedRadarLabel;

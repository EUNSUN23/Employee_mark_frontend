import React from "react";
import styled from "styled-components";

const Text = styled.div`
  font-size: 13px;
  width: 50px;
  height: 20px;
  text-align: center;
  color: #000;
`;

const CustomTick = (props) => {
  const { payload, x, y, fill } = props;
  const { value } = payload;

  return (
    <foreignObject x={x - 25} y={y} width="50" height="20">
      <Text>{value}</Text>
    </foreignObject>
  );
};

export default CustomTick;

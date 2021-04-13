import React from "react";
import styled from "styled-components";

const Label = styled.div`
  position: relative;
  font-size: 12px;
  border: 1px solid red;
  height: 60px;
  width: 40px;
  padding: 0 100%;
`;

const Value = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
`;

const Year = styled.div`
  position: absolute;
  bottom: 0;
  left: 0%;
`;

const SalaryLabel = (props) => {
  const { index, value, x, y, offset, year } = props;

  return (
    <foreignObject x={x - 20} y={y - 30} width="40" height="60">
      <Label>
        <Value>{value}</Value>
        <Year>{year[index]}</Year>
      </Label>
    </foreignObject>
  );
};

export default SalaryLabel;

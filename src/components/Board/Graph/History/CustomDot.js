import React from "react";
import styled from "styled-components";

const Dot = styled.div`
  position: relative;
  height: ${(props) => (props.active ? "6px" : "4px")};
  width: ${(props) => (props.active ? "6px" : "4px")};
  border-radius: ${(props) => (props.active ? "6px" : "4px")};
  border: ${(props) => `1px solid ${props.fill}`};
  background-color: ${(props) => (props.active ? `${props.fill}` : `#fff`)};
`;

const Label = styled.div`
  position: absolute;
  display: ${(props) => (props.active ? "block" : "none")};
  width: 50px;
  height: 30px;
  top: 9%;
  left: 0%;
  font-size: 10px;
  text-align: center;
  div {
    font-size: 11px;
    font-weight: bold;
  }
`;

const CustomDot = (props) => {
  const { index, cx, cy, stroke, onDotActive, activeIdx, payload } = props;
  const { date, salary } = payload;

  const active = index === activeIdx;

  const XPoint = active ? cx - 4 : cx - 3;
  const YPoint = active ? cy - 4 : cy - 3;

  return (
    <>
      <foreignObject x={XPoint} y={YPoint} width="100" height="100">
        <Label active={active}>
          <div>{salary}</div>
          {date}
        </Label>

        <Dot
          xmlns="http://www.w3.org/1999/xhtml"
          fill={stroke}
          active={active}
          date={date}
          salary={salary}
          onMouseEnter={() => onDotActive(index)}
        />
      </foreignObject>
    </>
  );
};

export default CustomDot;

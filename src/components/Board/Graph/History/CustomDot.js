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

const Date = styled.div`
  position: absolute;
  display: ${(props) => (props.active ? "block" : "none")};
  width: 20px;
  height: 20px;
  padding: 0 10px;
  left: -50%;
  font-size: 12px;
  border: 1px solid black;
`;

const CustomDot = (props) => {
  const { index, cx, cy, stroke, onDotActive, activeIdx, payload } = props;
  const { date, salary } = payload;

  const active = index === activeIdx;

  console.log("dot", props);

  const XPoint = active ? cx - 4 : cx - 3;
  const YPoint = active ? cy - 4 : cy - 3;

  console.log("active?", active, index);

  return (
    <>
      <foreignObject x={XPoint} y={YPoint} width="50" height="30">
        <Date active={active}>{date}</Date>
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

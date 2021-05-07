import React from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Title = styled.span`
  position: absolute;
  color: #000;
  font-size: ${(props) => (props.underLg ? "12px" : "14px")};
  font-weight: bold;
  background-color: #fff;
  text-shadow: 1px 2px 0px #d6d6dd;
  transform: translateY(-20%);
  width: 80px;
  text-align: center;
`;

const Label = (props) => {
  const { x, y, value, index, activeIndex, width, fill } = props;
  const underLg = useMediaQuery("(max-width:992px)");
  const lineXPoint = x + width / 2;
  const YPoint = y - 35;

  const highlight = index === activeIndex;

  if (!highlight) return null;

  return (
    <>
      <g>
        <foreignObject x={x} y={YPoint} width="100" height="50">
          <Title
            xmlns="http://www.w3.org/1999/xhtml"
            highlight={highlight}
            underLg={underLg}
          >{`${value}명`}</Title>
        </foreignObject>
        <path
          d={`M${lineXPoint},${y}L${lineXPoint},${y - 12}L${lineXPoint},${
            y - 10
          }`}
          stroke={fill}
          strokeWidth={1.5}
          fill="none"
        />
        <circle
          cx={lineXPoint}
          cy={y - 15}
          r={3}
          fill={fill}
          stroke="#FFF"
          strokeWidth={2}
        />
      </g>
    </>
  );
};

export default Label;

import React from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Title = styled.span`
  position: absolute;
  color: #000;
  font-size: ${(props) =>
    props.underLg || !props.highlight ? "12px" : "14px"};
  font-weight: ${(props) => props.highlight && "bold"};
  background-color: ${(props) => (props.highlight ? "#fff" : "none")};
  text-shadow: ${(props) => (props.highlight ? "1px 2px 0px #d6d6dd" : "none")};
  transform: ${(props) => props.highlight && "translateY(-20%)"};
`;

const CustomizedLabel = (props) => {
  const { x, y, value, index, currentVal, width } = props;
  const underLg = useMediaQuery("(max-width:992px)");

  const salary = 40000 + 10000 * index;
  const highlight = salary === currentVal;
  const lineXPoint = x + width / 2;

  const YPoint = highlight ? y - 35 : y - 25;

  const indicator = highlight ? (
    <>
      <path
        d={`M${lineXPoint},${y}L${lineXPoint},${y - 12}L${lineXPoint},${
          y - 10
        }`}
        stroke="#E20830"
        strokeWidth={1.5}
        fill="none"
      />
      <circle
        cx={lineXPoint}
        cy={y - 15}
        r={3}
        fill="#E20830"
        stroke="#FFF"
        strokeWidth={2}
      />
    </>
  ) : null;

  return (
    <>
      <g>
        {" "}
        <foreignObject x={x} y={YPoint} width="100" height="50">
          <Title
            xmlns="http://www.w3.org/1999/xhtml"
            highlight={highlight}
            underLg={underLg}
          >{`${value}명`}</Title>
        </foreignObject>
        {indicator}
      </g>
    </>
  );
};

export default CustomizedLabel;

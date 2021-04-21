import React from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Label = styled.div`
  color: #222;
  position: absolute;
  font-size: 10px;
  padding: 5px;
  border-radius: 1px;
  text-align: center;
`;

const Title = styled.h6`
  padding: 0px;
  margin: 0 0 2px 0;
`;

const Highlight = styled.div`
  color: #222;
  text-shadow: 1px 2px 0px #d6d6dd;
  font-size: ${(props) => (props.underLg ? "16px" : "20px")};
`;

const CustomizedLabel = (props) => {
  const { x, y, value, index, currentVal } = props;
  const underLg = useMediaQuery("(max-width:992px)");

  const makeLabel = (value, index, currentVal) => {
    const salary = 40000 + 10000 * index;
    const highlight = salary === currentVal;

    let label;
    if (highlight) {
      label = (
        <foreignObject x={x - 5} y={y - 25} width="100" height="50">
          <Highlight xmlns="http://www.w3.org/1999/xhtml" underLg={underLg}>
            <Title xmlns="http://www.w3.org/1999/xhtml">{`${value}명`}</Title>
          </Highlight>
        </foreignObject>
      );
    } else {
      label = (
        <foreignObject x={x - 5} y={y - 25} width="100" height="50">
          <Label xmlns="http://www.w3.org/1999/xhtml">
            <Title
              xmlns="http://www.w3.org/1999/xhtml"
              underLg={underLg}
            >{`${value}명`}</Title>
          </Label>
        </foreignObject>
      );
    }

    return label;
  };

  return (
    <>
      <g>{makeLabel(value, index, currentVal)}</g>
    </>
  );
};

export default CustomizedLabel;

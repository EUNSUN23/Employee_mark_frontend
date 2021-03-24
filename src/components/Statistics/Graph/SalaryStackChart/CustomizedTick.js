import { memo } from "react";
import styled from "styled-components";

const Tick = styled.span`
  font-size: ${(props) => (props.value.length > 8 ? "12px" : "14px")};
  margin: 0 20px;
  padding: ${(props) => (props.value.length <= 8 ? "0 25px" : "0 10px")};
  color: ${(props) => (props.emp === 0 ? "#999" : "black")};
  position: absolute;
  text-align: center;
`;

const CustomizedTick = memo((tickProps) => {
  const { x, y, payload, data } = tickProps;
  const { value, offset } = payload;

  console.log("tickProps", tickProps);

  const emp = data[value];
  console.log("emp", emp);

  return (
    <foreignObject x={x - 70} y={y} width="140" height="50">
      <Tick xmlns="http://www.w3.org/1999/xhtml" value={value} emp={emp}>
        {value}
      </Tick>
    </foreignObject>
  );
});

export default CustomizedTick;

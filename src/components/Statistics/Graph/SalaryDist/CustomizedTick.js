import styled from "styled-components";

const Tick = styled.span`
  font-size: ${(props) => (props.value.length > 8 ? "12px" : "14px")};
  margin: 0 20px;
  padding: ${(props) => (props.value.length <= 8 ? "0 25px" : "0 10px")};
  color: ${(props) => (props.emp === 0 ? "#999" : "#222")};
  position: absolute;
  text-align: center;
  font-weight: bold;
  left: 5%;
`;

const CustomizedTick = (tickProps) => {
  const { x, y, payload, data, width, index } = tickProps;
  const { value } = payload;

  const emp = data[value];
  const tickVal = typeof value === "string" ? value : `${value / 10000}만`;

  return (
    <foreignObject x={x - 70} y={y} width="140" height="50">
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={tickVal}
        emp={emp}
        width={width}
      >
        {tickVal}
      </Tick>
    </foreignObject>
  );
};

export default CustomizedTick;

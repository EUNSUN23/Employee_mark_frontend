import styled from "styled-components";

const Tick = styled.span`
  font-size: ${(props) => (props.value.length > 8 ? "12px" : "14px")};
  margin: 0 20px;
  padding: ${(props) => (props.value.length <= 8 ? "0 25px" : "0 10px")};
  color: ${(props) => (props.emp === 0 ? "#999" : "#222")};
  position: absolute;
  text-align: center;
  font-weight: bold;
`;

const CustomizedTick = (tickProps) => {
  const { x, y, payload, data, width } = tickProps;
  const { value } = payload;

  const emp = data[value];
  console.log("tick", tickProps);

  return (
    <foreignObject x={x - 70} y={y} width="140" height="50">
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={value}
        emp={emp}
        width={width}
      >
        {value}
      </Tick>
    </foreignObject>
  );
};

export default CustomizedTick;

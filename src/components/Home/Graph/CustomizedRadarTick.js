import styled from "styled-components";

const Tick = styled.span`
  font-size: ${(props) => (props.value.length > 8 ? "12px" : "14px")};
  margin: 0 20px;
  padding: ${(props) => (props.value.length <= 8 ? "0 20px" : "0 12px")};
  color: ${(props) => (props.emp === 0 ? "#999" : "#222")};
  position: absolute;
  text-align: center;
  font-weight: bold;
  left: 5%;
  div {
    font-weight: normal;
    color: grey;
    font-size: 12px;
  }
`;

const CustomizedRadarTick = (tickProps) => {
  const { x, y, payload, data, width, radius, index } = tickProps;
  const { coordinate, value } = payload;

  const d = (Math.round(radius) / 5).toFixed(); // 그래프 크기에 따라서 label간격조정

  console.log("tick", tickProps, "d", d);

  const emp = data[index].count;
  const tickVal = typeof value === "string" ? value : `${value / 10000}만`;

  const labelAngle = Math.round(coordinate);

  console.log("angle", labelAngle);

  let XPoint;
  let YPoint;

  if (labelAngle < 90 && labelAngle > -70) {
    XPoint = x - d;
    YPoint = y - 10;
    console.log("first", XPoint, YPoint);
  }
  if (labelAngle <= -70 && labelAngle >= -120) {
    XPoint = x - 2 * d;
    YPoint = y + d;

    console.log("2", XPoint, YPoint);
  }

  if (labelAngle <= -150 && labelAngle >= -230) {
    XPoint = x - 3 * d;
    YPoint = y - 10;
    console.log("3", XPoint, YPoint);
  }

  if (labelAngle === 90) {
    XPoint = x - 2 * d;
    YPoint = y - d;
    console.log("4", XPoint, YPoint);
  }

  return (
    <foreignObject x={XPoint} y={YPoint} width="140" height="50">
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={tickVal}
        emp={emp}
        width={width}
      >
        {tickVal}
        <div>{`${emp}명`}</div>
      </Tick>
    </foreignObject>
  );
};

export default CustomizedRadarTick;

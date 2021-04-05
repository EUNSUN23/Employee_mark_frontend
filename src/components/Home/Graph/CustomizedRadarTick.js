import styled from "styled-components";
import Svg from "../../../shared/svgIcons";

const Tick = styled.div`
  position: relative;
  width: 170px;
  left: 0;

  margin: 0 20px;
`;

const Label = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: ${(props) => (props.value.length <= 16 ? "14px" : "12px")};
  padding: ${(props) =>
    props.value.length <= 16 ? "0px 30px 0px" : "0px 30px 0px"};
  position: absolute;
  top: 0;
  left: 0;
`;

const Icon = styled.div`
  width: 23px;
  height: 23px;
  left: 0%;
  position: absolute;
`;

const CustomizedRadarTick = (tickProps) => {
  const { x, y, payload, data, width, radius, index } = tickProps;
  const { coordinate, value } = payload;

  const d =
    radius > 180
      ? (Math.round(radius) / 5).toFixed()
      : (Math.round(radius) / 3.5).toFixed(); // 그래프 크기에 따라서 label간격조정

  const emp = data[index].count;
  const tickVal = typeof value === "string" ? value : `${value / 10000}만`;

  const labelAngle = Math.round(coordinate);

  console.log(value, tickProps);

  let XPoint;
  let YPoint;

  if (labelAngle < 90 && labelAngle > -70) {
    XPoint = radius > 180 ? x + d : x;
    YPoint = y - 10;
  }
  if (labelAngle <= -70 && labelAngle >= -120) {
    XPoint = x - 1.5 * d;
    YPoint = y + 10;
  }

  if (labelAngle <= -150 && labelAngle >= -230) {
    XPoint = radius > 180 ? x - 3.3 * d : x - 2.5 * d;
    YPoint = y - 10;
  }

  if (labelAngle === 90) {
    XPoint = x - 2 * d;
    YPoint = y - 30;
  }

  return (
    <foreignObject x={XPoint} y={YPoint} width="170" height="80">
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={tickVal}
        emp={emp}
        width={width}
      >
        <Icon>
          <Svg label={tickVal} />
        </Icon>
        <Label value={tickVal}>{tickVal}</Label>
        {/* <LabelVal label={tickVal}>{`${emp}명`}</LabelVal> */}
      </Tick>
    </foreignObject>
  );
};

export default CustomizedRadarTick;

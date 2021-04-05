import styled from "styled-components";
import Svg from "../../../shared/svgIcons";

const Tick = styled.div`
  position: relative;
  width: 170px;
  height: 100px;
  left: 0;
  color: ${(props) => (props.activeValue === props.value ? "green" : "black")};
  margin: 0 20px;
`;

const Label = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: ${(props) => (props.value.length <= 16 ? "15px" : "13px")};
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
  const { x, y, payload, data, width, radius, index, activeValue } = tickProps;
  const { coordinate, value } = payload;

  const d =
    radius > 180
      ? (Math.round(radius) / 5).toFixed()
      : (Math.round(radius) / 3.5).toFixed(); // 그래프 크기에 따라서 label간격조정

  const emp = data[index].count;
  const tickVal = typeof value === "string" ? value : `${value / 10000}만`;

  const labelAngle = Math.round(coordinate);

  let XPoint;
  let YPoint;

  if (labelAngle < 90 && labelAngle > -70) {
    XPoint = radius > 180 ? x + d : x - 10;
    YPoint = y - 10;
  }
  if (labelAngle <= -60 && labelAngle >= -120) {
    XPoint = x - 1.5 * d;
    YPoint = y + 15;
  }

  if (labelAngle <= -150 && labelAngle >= -230) {
    XPoint = radius > 180 ? x - 3.3 * d : x - 2.5 * d;
    YPoint = y - 10;
  }

  if (labelAngle === 90) {
    XPoint = radius > 180 ? x - 2 * d : x - d;
    YPoint = y - 30;
  }

  return (
    <foreignObject x={XPoint} y={YPoint} width="170" height="80">
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={tickVal}
        activeValue={activeValue}
      >
        <Icon>
          <Svg label={tickVal} />
        </Icon>
        <Label value={tickVal}>{tickVal}</Label>
      </Tick>
    </foreignObject>
  );
};

export default CustomizedRadarTick;

import styled from "styled-components";
import Svg from "../../../shared/svgIcons";
import { setChartColor } from "../../../shared/utility";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Tick = styled.div`
  position: relative;
  width: 2vw;
  height: 80px;
  left: 0;
  color: ${(props) =>
    props.activeValue === props.value ? props.fill : "black"};
  margin: 0 17px;
  cursor: pointer;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: ${(props) => (props.overMd ? "1.5vw" : "2vw")};
  padding: 0 30px 0;
  position: absolute;
  text-shadow: 2px 3px 1px #e8e8e8;
  top: 0;
  left: 0;
`;

const Icon = styled.div`
  left: 0%;
  position: absolute;
`;

const CustomizedRadarTick = (tickProps) => {
  const { x, y, payload, radius, activeValue } = tickProps;
  const { coordinate, value } = payload;
  const overMd = useMediaQuery("(min-width:768px)");

  const d =
    radius > 180
      ? (Math.round(radius) / 4.5).toFixed()
      : (Math.round(radius) / 2.2).toFixed();

  const tickVal = typeof value === "string" ? value : `${value / 10000}만`;

  const labelAngle = Math.round(coordinate);

  let XPoint;
  let YPoint;

  if (labelAngle < 90 && labelAngle > -70) {
    XPoint = x + 5;
    YPoint = y - d / 5;
  }
  if (labelAngle <= -60 && labelAngle >= -120) {
    XPoint = x - d;
    YPoint = y + d / 5;
  }

  if (labelAngle <= -150 && labelAngle >= -230) {
    XPoint = overMd ? x - d - 80 : x - d - 60;
    YPoint = y - d / 5;
  }

  if (labelAngle === 90) {
    XPoint = x - 80;
    YPoint = overMd ? y - 40 : y - d / 2;
  }

  const fill = setChartColor(tickVal) || "green";

  return (
    <foreignObject x={XPoint} y={YPoint} width="170" height="80">
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={tickVal}
        fill={fill}
        activeValue={activeValue}
      >
        <Icon>
          <Svg name={tickVal} />
        </Icon>
        <Label value={tickVal} overMd={overMd}>
          {tickVal}
        </Label>
      </Tick>
    </foreignObject>
  );
};

export default CustomizedRadarTick;

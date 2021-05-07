import { useRef, useEffect } from "react";
import styled from "styled-components";
import Svg from "../../../../shared/svgIcons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { setChartColor } from "../../../../shared/utility";

const Tick = styled.span`
  position: absolute;
  cursor: pointer;
  padding: ${(props) => (props.value.length <= 8 ? "0 15px" : "0 12px")};
  margin: 0 20px;
  font-size: ${(props) => (props.value.length <= 8 ? "14px" : "12px")};
  color: ${(props) => (props.emp === 0 ? "#999" : props.tickColor)};
  text-align: center;
  font-weight: bold;
  &:hover {
    text-shadow: 1px 3px 1px #e8e8e8;
  }

  @media only screen and (max-width: 768px) {
    div {
      position: absolute;
      color: ${(props) => (props.emp === 0 ? "#999" : props.tickColor)};
      text-align: center;
      font-weight: normal;
      cursor: pointer;
      &::after {
        display: none;
        position: absolute;
        left: ${(props) => (props.value.length <= 8 ? "-50%" : "-70%")};
        top: 0%;
        width: ${(props) => (props.value.length <= 8 ? "40px" : "60px")};
        height: 40px;
        line-height: ${(props) => (props.value.length <= 11 ? "20px" : "10px")};
        font-size: 10px;
        background-color: #fff;
        content: "${(props) => props.value}";
      }
      &:hover {
        &::after {
          display: block;
          font-weight: bold;
          padding: ${(props) =>
            props.value.length <= 8 ? "0px" : "0 50px 0 0"};
          margin-left: ${(props) => (props.value.length <= 8 ? "0px" : "-2px")};
        }
      }
    }
  }
`;

const CustomizedTick = (tickProps) => {
  const {
    x,
    y,
    payload,
    data,
    width,
    onChangeTick,
    index,
    activeIndex,
  } = tickProps;
  const { value } = payload;
  const tickRef = useRef();
  const underMd = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    tickRef.current.addEventListener("click", () => onChangeTick(index));

    return () => {
      window.removeEventListener("click", () => onChangeTick(index));
    };
  }, [data]);

  const emp = data[value];
  const normalTickVal =
    typeof value === "string" ? value : `${value / 10000}만`;
  const smallTickVal =
    typeof value === "string" ? (
      <Svg name={value} component="div" />
    ) : (
      `${value / 10000}만`
    );

  const tickVal = underMd ? smallTickVal : normalTickVal;
  const XPoint = underMd ? x - 45 : x - 70;
  const YPoint = underMd ? y + 10 : y;
  const tickWidth = 140;
  const tickHeight = underMd ? 80 : 50;
  const highlight = index === activeIndex;
  const tickColor = highlight ? setChartColor(data[index].name) : "#000";

  return (
    <foreignObject x={XPoint} y={YPoint} width={tickWidth} height={tickHeight}>
      <Tick
        xmlns="http://www.w3.org/1999/xhtml"
        value={value}
        emp={emp}
        width={width}
        ref={tickRef}
        tickColor={tickColor}
      >
        {tickVal}
      </Tick>
    </foreignObject>
  );
};

export default CustomizedTick;

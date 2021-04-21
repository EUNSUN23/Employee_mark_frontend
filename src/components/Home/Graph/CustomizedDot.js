import React from "react";
import { setChartColor } from "../../../shared/utility";

const CustomizedDot = (props) => {
  const { cx, cy, r, activeValue, payload } = props;
  const { name } = payload;

  const XPoint = cx;
  const YPoint = cy;

  if (name !== activeValue) return null;

  const fill = setChartColor(name);

  return (
    <g>
      <circle cx={XPoint} cy={YPoint} r={r} fill={fill} />
    </g>
  );
};

export default CustomizedDot;

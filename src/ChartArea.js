import React, { useState, memo } from "react";
import { Area } from "recharts";

const ChartArea = (props) => {
  const { dataKey } = props;
  const [stroke, setStroke] = useState();
  const [fill, setFill] = useState();

  console.log("data key", dataKey);

  switch (dataKey) {
    case "Customer Service":
      setStroke("red");
      setFill("red");
      return;
    case "Development":
      setStroke("orange");
      setFill("orange");
      return;
    case "Finance":
      setStroke("green");
      setFill("green");
      return;
    case "Human Resources":
      setStroke("blue");
      setFill("blue");
      return;
    case "Marketing":
      setStroke("navy");
      setFill("navy");
      return;
    case "Production":
      setStroke("purple");
      setFill("purple");
      return;
    case "Quality Management":
      setStroke("skyblue");
      setFill("skyblue");
      return;
    case "Research":
      setStroke("evergreen");
      setFill("evergreen");
      return;
    case "Sales":
      setStroke("plum");
      setFill("plum");
      return;
  }
  return (
    <Area
      type="monotone"
      dataKey={dataKey}
      stroke={stroke}
      fillOpacity={0.5}
      fill={fill}
    />
  );
};
export default ChartArea;

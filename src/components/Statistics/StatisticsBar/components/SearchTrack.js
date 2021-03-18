import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import TrackRadio from "./TrackRadio";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const SearchTrack = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        track={false}
        defaultValue={80}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
      <TrackRadio />
    </div>
  );
};

export default SearchTrack;

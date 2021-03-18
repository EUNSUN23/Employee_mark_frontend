import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const createLabel = (label, onChangeLabel) => {
  return (
    <label
      htmlFor={`label_for_{label}`}
      style={{ border: "1px solid black" }}
      onClick={() => {
        onChangeLabel(label);
      }}
    >
      <span id={`label_for_${label}`}>{label}</span>
    </label>
  );
};

const IOSSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-140% + 12px)",
    top: -20,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },

  trackInverted: {
    height: 2,
    "& $rail": {
      backgroundColor: "#3880ff",
    },
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

export default function CustomizedSlider() {
  const [value, setValue] = useState("");
  const classes = useStyles();
  const onChangeLabel = (label) => {
    console.log(label);
    setValue(label);
  };
  useEffect(() => {
    console.log("setValue", value);
  });

  console.log("setValue", value);
  const marks = [
    {
      value: 40000,
      label: createLabel(40000, onChangeLabel),
    },

    {
      value: 60000,
    },

    {
      value: 80000,
      label: 80000,
    },

    {
      value: 100000,
    },

    {
      value: 120000,
      label: createLabel(120000, onChangeLabel),
    },

    {
      value: 140000,
    },

    {
      value: 160000,
      label: createLabel(160000, onChangeLabel),
    },
  ];

  const onTrackHandler = (e) => {
    const { value } = e.target;
    console.log("value", e.target.nodeList);
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom>iOS</Typography>
      <IOSSlider
        track={true}
        min={40000}
        max={160000}
        aria-label="ios slider"
        defaultValue={40000}
        marks={marks}
        valueLabelDisplay="on"
        // value={value}
        // onChange={onTrackHandler}
      />
    </div>
  );
}

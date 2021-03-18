import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  root: {
    width: 320,
  },
  input: {
    width: 65,
    color: "white",
    fontSize: 15,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 13,
    color: "#444",
    ":focus": {
      color: "white",
    },
  },
});

const CustomLabel = ({ label }) => {
  const classes = useStyles();
  return <span className={classes.label}>{label}</span>;
};

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

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

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(40000);

  const handleSliderChange = (event, newValue) => {
    const left = parseInt(event.target.style.left);
    console.log(left);

    switch (left) {
      case 0:
        return setValue(40000);
      case 16:
        return setValue(60000);
      case 33:
        return setValue(80000);
      case 50:
        return setValue(100000);
      case 66:
        return setValue(120000);
      case 83:
        return setValue(140000);
      case 100:
        return setValue(160000);
      default:
        return setValue(newValue);
    }
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 40000) {
      setValue(40000);
    } else if (value > 160000) {
      setValue(160000);
    }
  };

  const marks = [
    {
      value: 40000,
      label: <CustomLabel label="4.0" />,
    },

    {
      value: 60000,
      label: <CustomLabel label="6.0" />,
    },

    {
      value: 80000,
      label: <CustomLabel label="8.0" />,
    },

    {
      value: 100000,
      label: <CustomLabel label="10.0" />,
    },

    {
      value: 120000,
      label: <CustomLabel label="12.0" />,
    },

    {
      value: 140000,
      label: <CustomLabel label="14.0" />,
    },

    {
      value: 160000,
      label: <CustomLabel label="16.0" />,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <IOSSlider
            track={true}
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={40000}
            max={160000}
            marks={marks}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: 40000,
              max: 160000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

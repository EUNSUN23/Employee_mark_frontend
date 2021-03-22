import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles, fade } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import RangeSelector from "./RangeSelector";
import { setArea, initArea } from "../../../../store/actions/statBar";
import { initDist } from "../../../../store/actions/statPage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 320,
    transform: "translateY(5%)",
  },
  input: {
    width: 70,
    color: "white",
    fontSize: 15,
    paddingLeft: 5,
  },
  label: {
    fontSize: 12,
    color: "#222",
  },
}));

const CustomLabel = ({ label }) => {
  const classes = useStyles();
  return <span className={classes.label}>{label}</span>;
};

const BoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const SalarySlider = withStyles((theme) => ({
  root: {
    color: "#6868ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    boxShadow: BoxShadow,
    marginTop: -8,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: BoxShadow,
      },
    },
  },
  active: {},
  track: {
    height: 2,
  },

  trackInverted: {
    height: 2,
    "& $rail": {
      backgroundColor: "#6868ff",
    },
  },
  rail: {
    height: 2,
    opacity: 1,
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    // backgroundColor: "currentColor",
  },
}))(Slider);

const SearchTrack = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [range, setRange] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (range && value) {
      console.log("range", range, "value", value);
      const area = { type: range, salary: value };
      dispatch(setArea(area));
    } else {
      dispatch(initArea());
      dispatch(initDist());
    }
  }, [range, value]);

  const handleRangeChange = useCallback(
    (range) => {
      setRange(range);
    },
    [setRange]
  );

  const handleSliderChange = (event, newValue) => {
    const left = parseInt(event.target.style.left);
    console.log(left);
    setRange(null);
    // dispatch(initArea());
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
    setRange(null);
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

  const trackType = range === "above" ? "inverted" : true;

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignItems="center" justify="flex-start">
        <Grid item xs={8}>
          <SalarySlider
            track={trackType}
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={40000}
            max={160000}
            marks={marks}
          />
        </Grid>

        <Grid item xs={2}>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={(e) => handleInputChange(e)}
            onBlur={handleBlur}
            inputProps={{
              min: 40000,
              max: 160000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <RangeSelector range={range} handleRangeChange={handleRangeChange} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchTrack;

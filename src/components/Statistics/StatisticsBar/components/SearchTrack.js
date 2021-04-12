import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles, fade } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import RangeSelector from "./RangeSelector";
import { setArea, initArea } from "../../../../store/actions/statBar";
import { initDist } from "../../../../store/actions/statPage";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    height: "7vh",
    width: "50vw",
    display: "flex",
  },
  track: {
    width: "30vw",
  },
  input: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "10vw",
    fontSize: "2vw",
    [theme.breakpoints.up("md")]: {
      width: "6.5vw",
      fontSize: "1.4vw",
    },
    color: "white",
  },
  inputLabel: {
    position: "absolute",
    left: "10%",
    top: "50%",
    transform: "translateY(-50%)",
    display: "block",
    color: "#fff",
    fontSize: "1.2vw",
    width: "7vw",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5vw",
    },
  },
  label: {
    fontSize: "1.1vw",
    color: "#222",
  },
  backBtn: {
    position: "absolute",
    right: "-25%",
    [theme.breakpoints.down("sm")]: {
      right: "-50%",
      width: "15vw",
      fontSize: "1vw",
    },
    width: "11vw",
    height: "5vh",
    [theme.breakpoints.up("md")]: {
      right: "-10%",
      width: "9vw",
      height: "6vh",
    },
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1.2vw",
    color: "white",
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
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  thumb: {
    height: "15px",
    width: "15px",
    [theme.breakpoints.up("lg")]: {
      height: "25px",
      width: "25px",
      marginTop: -10,
    },
    backgroundColor: "#fff",
    boxShadow: BoxShadow,
    marginTop: -6,
    marginLeft: -8,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      "@media (hover: none)": {
        boxShadow: BoxShadow,
      },
    },
  },
  track: {
    height: "1vh",
  },

  trackInverted: {
    height: "1vh",
    "& $rail": {
      backgroundColor: "#6868ff",
    },
  },
  rail: {
    height: "1vh",
    opacity: 1,
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: "2vh",
    width: 1,
    marginTop: -4,
  },
  markActive: {
    opacity: 1,
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
    <div className={classes.container}>
      <div className={classes.track}>
        <Grid container spacing={4} alignItems="center" justify="space-between">
          <Grid item md={8}>
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
          <Grid item xs={1} sm={1}>
            <label htmlFor="salaryInput" className={classes.inputLabel}>
              연봉 :
            </label>
            <Input
              id="salaryInput"
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
          <Grid item xs={1} sm={2}>
            <RangeSelector
              range={range}
              handleRangeChange={handleRangeChange}
            />
          </Grid>
        </Grid>
      </div>
      <Button variant="contained" color="primary" className={classes.backBtn}>
        돌아가기
      </Button>
    </div>
  );
};

export default SearchTrack;

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
import { setSelected } from "../../../../store/actions/statBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    height: "7vh",
    width: "55vw",
    display: "flex",
  },
  track: {
    width: "30vw",
  },
  input: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "12vw",
    height: "7vh",
    fontSize: "15px",
    [theme.breakpoints.up("lg")]: {
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
    fontSize: "2vw",
    width: "7vw",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5vw",
    },
  },
  label: {
    fontSize: "1vw",
    color: "#222",
  },
  backBtn: {
    position: "absolute",
    right: "-30vw",
    width: "12vw",
    fontSize: "15px",
    height: "6vh",
    [theme.breakpoints.up("lg")]: {
      right: "0%",
      width: "9vw",
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
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  thumb: {
    height: "20px",
    width: "20px",
    marginTop: -8,
    [theme.breakpoints.up("xl")]: {
      height: "25px",
      width: "25px",
      marginTop: -10,
    },
    backgroundColor: "#fff",
    boxShadow: BoxShadow,
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

  const underLg = useMediaQuery("(max-width:992px)");
  const spacing = underLg ? 10 : 3;
  const trackType = range === "above" ? "inverted" : true;

  useEffect(() => {
    if (range && value) {
      console.log("range", range, "value", value);
      const area = { type: range, salary: value };
      dispatch(setArea(area));
    } else {
      dispatch(initArea());
      dispatch(initDist());
    }
  }, [range, value, dispatch]);

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

  const onClickBackBtn = () => {
    dispatch(setSelected(null));
  };

  return (
    <div className={classes.container}>
      <div className={classes.track}>
        <Grid
          container
          spacing={spacing}
          alignItems="center"
          justify="space-between"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.backBtn}
            onClick={() => onClickBackBtn()}
          >
            돌아가기
          </Button>
          <Grid item lg={8}>
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
          <Grid item xs={1}>
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
    </div>
  );
};

export default SearchTrack;

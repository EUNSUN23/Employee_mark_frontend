import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    height: 30,
    borderRadius: 10,
    position: "relative",
    margin: "20px 0 40px 0",
    border: "1px solid #555",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 10px 15px, rgba(0, 0, 0, 0.45) 0px 5px 5px",
  },

  subTitle: {
    position: "absolute",
    right: 10,
    top: -20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
  },
}));

const CustomLabel = ({ label }) => {
  const classes = useStyles();
  return (
    <foreignObject>
      <span xmlns="http://www.w3.org/1999/xhtml" className={classes.label}>
        {label}
      </span>
    </foreignObject>
  );
};

const mark = [
  {
    value: 40000,
    label: <CustomLabel label="4" />,
  },
  {
    value: 50000,
    label: <CustomLabel label="5" />,
  },
  {
    value: 60000,
    label: <CustomLabel label="6" />,
  },
  {
    value: 70000,
    label: <CustomLabel label="7" />,
  },
  {
    value: 80000,
    label: <CustomLabel label="8" />,
  },
  {
    value: 90000,
    label: <CustomLabel label="9" />,
  },

  {
    value: 100000,
    label: <CustomLabel label="10" />,
  },
  {
    value: 110000,
    label: <CustomLabel label="11" />,
  },
  {
    value: 120000,
    label: <CustomLabel label="12" />,
  },
  {
    value: 130000,
    label: <CustomLabel label="13" />,
  },
  {
    value: 140000,
    label: <CustomLabel label="14" />,
  },
  {
    value: 150000,
    label: <CustomLabel label="15" />,
  },
  {
    value: 160000,
    label: <CustomLabel label="16" />,
  },
];

const PrettoSlider = withStyles({
  root: {
    color: "#303F99 ",
    height: "20%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "80%",
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },

  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  mark: {
    width: 1,
    height: 4,
    backgroundColor: "white",
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider);

const CustomizedFilter = memo((props) => {
  const classes = useStyles();
  const { onChangeFilter } = props;

  return (
    <foreignObject width="100%" height={80}>
      <Grid item className={classes.root}>
        <h6 className={classes.subTitle}>단위 : 만(10,000)</h6>
        <PrettoSlider
          valueLabelDisplay="off"
          aria-label="pretto slider"
          defaultValue={40000}
          step={10000}
          marks={mark}
          min={40000}
          max={160000}
          onChange={onChangeFilter}
        />
      </Grid>
    </foreignObject>
  );
});
export default CustomizedFilter;

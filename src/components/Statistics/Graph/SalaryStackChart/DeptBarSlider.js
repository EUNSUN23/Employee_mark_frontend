import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    height: 70,
    borderRadius: 15,
    position: "relative",
    margin: "20px 0 40px 0",

    boxShadow:
      "rgba(50, 50, 93, 0) 0px 50px 100px -20px, rgba(0, 0, 0, 0.1) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <foreignObject>
      <span xmlns="http://www.w3.org/1999/xhtml">{children}</span>
    </foreignObject>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const CustomLabel = ({ label }) => {
  const classes = useStyles();
  return <span className={classes.label}>{label}</span>;
};

const mark = [
  {
    value: 40000,
    label: <CustomLabel label="4.0" />,
  },
  {
    value: 50000,
    label: <CustomLabel label="5.0" />,
  },
  {
    value: 60000,
    label: <CustomLabel label="6.0" />,
  },
  {
    value: 70000,
    label: <CustomLabel label="7.0" />,
  },
  {
    value: 80000,
    label: <CustomLabel label="8.0" />,
  },
  {
    value: 90000,
    label: <CustomLabel label="9.0" />,
  },

  {
    value: 100000,
    label: <CustomLabel label="10.0" />,
  },
  {
    value: 110000,
    label: <CustomLabel label="11.0" />,
  },
  {
    value: 120000,
    label: <CustomLabel label="12.0" />,
  },
  {
    value: 130000,
    label: <CustomLabel label="13.0" />,
  },
  {
    value: 140000,
    label: <CustomLabel label="14.0" />,
  },
  {
    value: 150000,
    label: <CustomLabel label="15.0" />,
  },
  {
    value: 160000,
    label: <CustomLabel label="16.0" />,
  },
];

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: "30%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "85%",
  },
  thumb: {
    height: 24,
    width: 24,
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
  track: {
    height: 8,
    borderRadius: 2,
  },
  rail: {
    height: 8,
    borderRadius: 2,
  },
})(Slider);

const DeptBarSlider = memo((props) => {
  const classes = useStyles();
  const { handleChangeSlider } = props;

  return (
    <Grid item className={classes.root}>
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        defaultValue={40000}
        step={10000}
        marks={mark}
        min={40000}
        max={160000}
        onChange={handleChangeSlider}
      />
    </Grid>
  );
});
export default DeptBarSlider;

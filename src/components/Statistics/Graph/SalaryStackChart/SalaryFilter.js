import React, { useState } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Icon } from "@material-ui/core";
import theme from "../../../../theme";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: "10%",
    width: "140px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  value: {
    width: "120px",
    "& span": {
      fontSize: "20px",
      color: "#222",
      fontWeight: "bold",
    },
  },
  button: {
    width: "40px",
  },
  icon: {
    cursor: "pointer",
    zIndex: 500,
  },
  icon_disabled: {
    cursor: "pointer",
    color: "grey",
  },
}));

const SalaryFilter = () => {
  const classes = useStyles();
  const [value, setValue] = useState(40000);
  const [disabled, setDisabled] = useState(null);

  const onClickIcon = (icon) => {
    const newValue = icon === "up" ? value + 10000 : value - 10000;
    if (newValue > 160000 || newValue < 40000) return setDisabled(icon);
    setDisabled(null);
    setValue(newValue);
  };

  console.log("value", value);

  const makeClassName = (icon) => {
    const cssClass = icon === disabled ? "icon_disabled" : "icon";
    return cssClass;
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        direction="column"
        className={classes.value}
        xs={8}
        justify="center"
        alignItems="center"
      >
        <span>{value}</span>
      </Grid>
      <Grid item xs={4} direction="column" container className={classes.button}>
        <div
          className={classes[makeClassName("up")]}
          onClick={() => onClickIcon("up")}
        >
          <ArrowDropUpIcon fontSize="large" />
        </div>
        <div
          className={classes[makeClassName("down")]}
          onClick={() => onClickIcon("down")}
        >
          <ArrowDropDownIcon fontSize="large" />
        </div>
      </Grid>
    </Grid>
  );
};

export default SalaryFilter;

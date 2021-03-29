import React, { memo } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import theme from "../../../../theme";

const useStyles = makeStyles(() => ({
  root: {
    width: "210px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  salary: {
    textAlign: "right",
  },
  value: {
    "& span:nth-child(1)": {
      fontSize: "18px",
      color: "#222",
      fontWeight: "bold",
    },
    "& span:nth-child(2)": {
      fontSize: "26px",
      color: "#222",
      fontWeight: "bold",
    },
  },
  button: {
    height: "50px",
    position: "relative",
    "& div:nth-child(1)": {
      top: "8%",
    },
    "& div:nth-child(2)": {
      top: "50%",
      transform: "translateY(-50%)",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 500,
      boxShadow: "2px 1px 2px 0px #CECECE",
      height: "20px",
    },
  },
  icon: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "20px",
    height: "20px",
    borderTop: "1px solid #EFEFF0",
    borderLeft: "1px solid #EFEFF0",
    cursor: "pointer",
    zIndex: 500,
    backgroundColor: "#ffffff",
    boxShadow: "2px 1px 2px 0px #CECECE",
  },

  icon_disabled: {
    cursor: "pointer",
    color: "grey",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "20px",
    height: "20px",
    borderTop: "1px solid #EFEFF0",
    borderLeft: "1px solid #EFEFF0",
    cursor: "pointer",
    zIndex: 500,
    backgroundColor: "#ffffff",
    boxShadow: "2px 1px 2px 0px #CECECE",
  },
  iconInner: {
    fontSize: 20,
  },
}));

const SalaryFilter = memo(({ onClickFilter, value }) => {
  const classes = useStyles();

  const upClassName = value === 160000 ? "icon_disabled" : "icon";

  const downClassName = value === 40000 ? "icon_disabled" : "icon";

  const onClickHandler = (icon) => {
    onClickFilter(icon);
  };
  return (
    <Grid item container className={classes.root} justify="flex-end">
      <Grid
        item
        container
        className={classes.value}
        xs={9}
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item component="span">
          연봉 :
        </Grid>
        <Grid item component="span">
          {value}
        </Grid>
      </Grid>
      <Grid
        item
        xs={1}
        direction="column"
        container
        className={classes.button}
        component="div"
        justify="flex-start"
      >
        <div
          className={classes[upClassName]}
          onClick={() => onClickHandler("up", value)}
        >
          <ArrowDropUpIcon fontSize="large" className={classes.iconInner} />
        </div>
        <div
          className={classes[downClassName]}
          onClick={() => onClickHandler("down", value)}
        >
          <ArrowDropDownIcon fontSize="large" className={classes.iconInner} />
        </div>
      </Grid>
    </Grid>
  );
});

export default SalaryFilter;

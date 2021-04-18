import React, { memo } from "react";
import Svg from "../../../../shared/svgIcons";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import theme from "../../../../theme";

const useStyles = makeStyles(() => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: "210px",
    },
    [theme.breakpoints.only("xs")]: {
      width: "180px",
    },
    backgroundColor: "#fff",
  },
  salary: {
    textAlign: "right",
  },
  value: {
    "& span:nth-child(1)": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: "15px",
      },
      color: "#222",
      fontWeight: "bold",
    },
    "& span:nth-child(2)": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "26px",
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: "20px",
      },
      color: "#222",
      fontWeight: "bold",
    },
  },
  button: {
    height: "50px",

    position: "relative",

    "& div:nth-child(1)": {
      top: "8%",
      paddingTop: "1px",
    },
    "& div:nth-child(2)": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%,0%)",
      boxShadow: "2px 1px 2px 0px #CECECE",

      zIndex: 500,
    },
  },
  icon: {
    position: "absolute",
    cursor: "pointer",
    left: "50%",
    transform: "translateX(-50%)",
    width: "20px",
    height: "20px",
    borderTop: "1px solid #EFEFF0",
    borderLeft: "1px solid #EFEFF0",
    backgroundColor: "#ffffff",
    boxShadow: "2px 1px 2px 0px #CECECE",
    "& div": {
      paddingLeft: "3px",
    },
  },
}));

const SalaryFilter = memo(({ onClickFilter, value }) => {
  const classes = useStyles();

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
        xs={2}
        direction="column"
        container
        className={classes.button}
        component="div"
        justify="flex-start"
      >
        <div
          className={classes.icon}
          onClick={() => onClickHandler("up", value)}
        >
          <Svg name="ArrowUp" component="div" fontSize="small" />
        </div>
        <div
          className={classes.icon}
          onClick={() => onClickHandler("down", value)}
        >
          <Svg name="ArrowDown" component="div" fontSize="small" />
        </div>
      </Grid>
    </Grid>
  );
});

export default SalaryFilter;

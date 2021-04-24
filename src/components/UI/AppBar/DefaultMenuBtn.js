import React, { memo } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Svg from "../../../shared/svgIcons";
import theme from "../../../shared/theme";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "40vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
    height: "8vh",
    [theme.breakpoints.up("xl")]: {
      height: "4.5vh",
      fontSize: "25px",
    },
  },
  arrowIcon: {
    position: "absolute",
    left: "0%",
    color: "#fff",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "40vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "25px",
    },
  },
};

const DefaultMenuBtn = (props) => {
  const { classes, value, initValue, onClickHandler } = props;

  return (
    <Button
      aria-controls="customized-menu"
      aria-haspopup="true"
      variant="contained"
      color="primary"
      onClick={onClickHandler}
      className={classes.root}
    >
      <ListItemIcon className={classes.arrowIcon}>
        <Svg name="ArrowDown" fontSize="large" component="div" />
      </ListItemIcon>
      <ListItemText
        primary={value ? value : initValue}
        className={classes.text}
      />
    </Button>
  );
};

DefaultMenuBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(DefaultMenuBtn));

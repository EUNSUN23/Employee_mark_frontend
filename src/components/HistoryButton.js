import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((type) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },

  unClicked: {
    flex: "1fr",
    padding: 1,
    color: "#039BE5",
    border: "1px solid #039BE5",
    backgroundColor: "transparent",
    zIndex: 500,
    cursor: "pointer",
    boxSizing: "content-box",
    alignItems: "flex-start",
    margin: 4,
    "&:focus": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
  },

  clicked: {
    flex: "1fr",
    padding: 1,
    cursor: "pointer",
    boxSizing: "content-box",
    alignItems: "flex-start",
    margin: 4,
    backgroundColor: "#0288D1",
    color: "white",
    border: "none",
    "&:focus": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
  },
}));

const HistoryButton = (props) => {
  const { selected, handleClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        className={selected === "dept" ? classes.clicked : classes.unClicked}
        variant="outlined"
        size="small"
        color="primary"
        disableRipple
        onFocus={() => {
          console.log("click");
          handleClick("dept");
        }}
      >
        부서 이동
      </Button>
      <Button
        className={selected === "salary" ? classes.clicked : classes.unClicked}
        variant="outlined"
        size="small"
        color="primary"
        disableRipple
        onFocus={() => {
          console.log("click");
          handleClick("salary");
        }}
      >
        연봉 변동
      </Button>
    </div>
  );
};

export default HistoryButton;

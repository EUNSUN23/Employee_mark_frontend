import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },

  initDeptButton: {
    flex: "1fr",
    padding: 1,
    backgroundColor: "#0288D1",
    color: "white",
    border: "none",
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
  deptButton: {
    flex: "1fr",
    padding: 1,
    color: "#039BE5",
    border: "1px solid #039BE5",
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
  salaryButton: {
    flex: "1fr",
    color: "#039BE5",
    border: "1px solid #039BE5",
    padding: 1,
    cursor: "pointer",
    boxSizing: "padding-box",
    alignItems: "flex-end",
    margin: 4,
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
        className={
          selected === null ? classes.initDeptButton : classes.deptButton
        }
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
        className={classes.salaryButton}
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

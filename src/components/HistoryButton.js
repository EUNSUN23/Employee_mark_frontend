import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  deptButton: {
    flex: "1fr",
    padding: 2,
    color: "#039BE5",

    border: "1px solid #039BE5",
    cursor: "pointer",
    boxSizing: "content-box",
    alignItems: "flex-start",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
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

    padding: 2,
    cursor: "pointer",
    boxSizing: "padding-box",
    alignItems: "flex-end",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
    "&:focus": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const HistoryButton = (props) => {
  const { handleClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        disableRipple
        className={classes.deptButton}
        onChange={() => {
          handleClick("부서 이동");
        }}
      >
        부서 이동
      </Button>

      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={classes.salaryButton}
        onChange={() => {
          handleClick("연봉 변동");
        }}
        disableRipple
      >
        연봉 변동
      </Button>
    </div>
  );
};

export default HistoryButton;

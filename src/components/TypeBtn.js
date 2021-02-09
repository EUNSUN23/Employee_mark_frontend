import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useBtn from "../hooks/useBtn";

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

const TypeBtn = (props) => {
  const { expanded, selected, handleClick } = props;
  const [button, initBtn] = useBtn(null);
  const classes = useStyles();

  useEffect(() => {
    button.button1 === null && button.button2 === null && initBtn(expanded);
  });

  return (
    <div className={classes.wrapper}>
      <Button
        className={
          selected === button.button1 || selected === "default"
            ? classes.clicked
            : classes.unClicked
        }
        variant="outlined"
        size="small"
        color="primary"
        disableRipple
        onFocus={() => {
          console.log("click");
          handleClick(button.button1);
        }}
      >
        {button.text1}
      </Button>
      <Button
        className={
          selected === button.button2 ? classes.clicked : classes.unClicked
        }
        variant="outlined"
        size="small"
        color="primary"
        disableRipple
        onFocus={() => {
          console.log("click");
          handleClick(button.button2);
        }}
      >
        {button.text2}
      </Button>
    </div>
  );
};

export default TypeBtn;

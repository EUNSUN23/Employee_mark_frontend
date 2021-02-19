import React, { useState, memo } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import History from "./History/History";
import useEmployeeData from "../../../../hooks/useEmployeeData";
import Rank from "./Rank/Rank";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    flexBasis: "100%",
    flexShrink: 0,
  },
  lastUpdate: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#555",
    textDecoration: "underLine",
    fontSize: 13,
  },
  trackWrapper: {
    transform: "translateY(-3%)",
  },
  rankCardWrapper: {
    transform: "translate(-5%,-21%)",
    margin: "0 auto",
  },
  track: {
    transform: "translateY(-15%)",
  },
  whole: {
    transform: "translateY(-30%)",
    height: 225,
  },
  rankTypeBtn: {
    // transform: "translateX(-10%)",
  },
  rankName: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "bold",
  },
}));

const CardAccordion = memo((props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [data, changeDataType, getData] = useEmployeeData();

  const { emp_no, dept_name, title } = props;

  /*패널 클릭시 데이터 받아오기 */
  const handleChange = (panel) => (event, isExpanded) => {
    console.log("PANEL Change", panel);
    if (isExpanded) {
      setExpanded(panel);
      switch (panel) {
        case "panel1":
          getData("history", emp_no, dept_name, title);
          return;
        case "panel2":
          getData("rank", emp_no, dept_name, title);
          return;
        default:
          return;
      }
    } else {
      setExpanded(false);
      changeDataType(null);
    }
  };

  return (
    <div className={classes.root}>
      <History
        type={expanded === "panel1" ? data.type : null}
        data={expanded === "panel1" ? data.data : null}
        expanded={expanded}
        onChangeAccordion={handleChange}
        changeDataType={changeDataType}
        classes={classes}
      />
      <Rank
        type={expanded === "panel2" ? data.type : null}
        data={expanded === "panel2" ? data.data : null}
        expanded={expanded}
        onChangeAccordion={handleChange}
        changeDataType={changeDataType}
        classes={classes}
      />
    </div>
  );
});

export default CardAccordion;

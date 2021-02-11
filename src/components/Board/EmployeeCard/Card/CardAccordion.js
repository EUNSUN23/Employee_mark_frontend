import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import History from "./History/History";
import useEmployeeData from "../../../../hooks/useEmployeeData";
import Rank from "./Rank/Rank";

const historyData = {
  dept: [
    { from: "2002-01-23", to: "2005-02-23", dept: "marketing" },
    { from: "2005-02-24", to: "2007-01-24", dept: "service" },
    { from: "2007-01-25", to: "2009-02-23", dept: "finance" },
    { from: "2009-02-24", to: "2010-02-23", dept: "production" },
  ],
  salary: [
    { from: "2002-01-23", to: "2005-02-23", salary: "20000" },
    { from: "2005-02-24", to: "2007-01-24", salary: "30000" },
    { from: "2007-01-25", to: "2009-02-23", salary: "40000" },
    { from: "2009-02-24", to: "2010-02-23", salary: "20000" },
  ],
};

const rankData = {
  steadRank: {
    period: 2,
    entire: 2,
    dept: 1,
    role: 3,
  },
  salaryRank: {
    period: 1,
    entire: 1,
    dept: 1,
    role: 1,
  },
};

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

const CardAccordion = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [data, changeDataType, getData] = useEmployeeData();

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("PANEL Change", panel);
    if (isExpanded) {
      setExpanded(panel);
      switch (panel) {
        case "panel1":
          getData(historyData);
          return;
        case "panel2":
          getData(rankData);
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
        handleChange={handleChange}
        changeDataType={changeDataType}
        classes={classes}
      />
      <Rank
        type={expanded === "panel2" ? data.type : null}
        data={expanded === "panel2" ? data.data : null}
        expanded={expanded}
        handleChange={handleChange}
        changeDataType={changeDataType}
        classes={classes}
      />
    </div>
  );
};

export default CardAccordion;

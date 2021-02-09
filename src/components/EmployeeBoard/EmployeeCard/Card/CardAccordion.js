import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import History from "./History/History";
import useHistory from "../../../../hooks/useHistory";
import useRank from "../../../../hooks/useRank";
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
  stead: {
    period: 2,
    entire: 2,
    dept: 1,
    role: 3,
  },
  salary: {
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
  historyWrapper: {
    transform: "translateY(-3%)",
  },
  track: {
    transform: "translateY(-10%)",
  },
}));

const CardAccordion = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [history, changeHistoryType, getHistoryData] = useHistory();
  const [rank, changeRankType, getRankData] = useRank();

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("PANEL Change", panel);
    if (isExpanded) {
      setExpanded(panel);
      switch (panel) {
        case "panel1":
          getHistoryData(historyData);
          return;
        case "panel2":
          getRankData(rankData);
          return;
        default:
          return;
      }
    } else {
      setExpanded(false);
      changeHistoryType("dept");
      changeRankType("stead");
    }
  };

  return (
    <div className={classes.root}>
      <History
        historyType={history.type}
        historyData={history.data}
        expanded={expanded}
        handleChange={handleChange}
        changeHistoryType={changeHistoryType}
        classes={classes}
      />
      <Rank
        rankType={rank.type}
        rankData={rank.data}
        expanded={expanded}
        handleChange={handleChange}
        changeRankType={changeRankType}
        classes={classes}
      />
    </div>
  );
};

export default CardAccordion;

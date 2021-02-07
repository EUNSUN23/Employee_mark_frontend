import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import History from "./History/History";
import Rank from "./Rank/Rank";

const history = {
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
  const [historyType, setHistoryType] = useState("dept");
  const [historyData, setHistoryData] = useState();

  const handleChange = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    [historyType]
  );

  const changeHistoryType = useCallback(
    (selected) => {
      console.log("click");
      setHistoryType(selected);
    },
    [historyType]
  );

  useEffect(() => {
    console.log(
      "USE_EFFECT",
      "expanded:",
      expanded,
      "historyType:",
      historyType
    );
    expanded === false && setHistoryType("dept");
    expanded && historyType === "dept" && setHistoryData(history.dept);
    expanded && historyType === "salary" && setHistoryData(history.salary);
    /* rank패널 열릴 때에는 historyaccordion 렌더링 되지 않게 하기. : 위에 'rank패널이 열리지 않는 경우'
    추가하기. */
  }, [expanded, historyType]);

  return (
    <div className={classes.root}>
      <History
        historyType={historyType}
        historyData={historyData}
        expanded={expanded}
        handleChange={handleChange}
        changeHistoryType={changeHistoryType}
        classes={classes}
      />
      <Rank expanded={expanded} handleChange={handleChange} classes={classes} />
    </div>
  );
};

export default CardAccordion;

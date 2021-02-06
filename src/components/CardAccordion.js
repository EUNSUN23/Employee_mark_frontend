import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import HistoryButton from "./HistoryButton";
import Track from "./Track";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const changeHistoryType = (selected) => {
    console.log("click");
    setHistoryType(selected);
  };

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
  }, [expanded, historyType]);

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel12bh-content"
          id="panel12bh-header"
        >
          <Typography className={classes.heading}>
            부서이동 및 연봉변동 기록
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.AccordionDetails}>
          <Grid
            container
            item
            direction="column"
            className={classes.historyWrapper}
          >
            <Grid item>
              <HistoryButton
                handleClick={changeHistoryType}
                selected={historyType}
              />
            </Grid>
            <Grid item className={classes.track}>
              <Track historyType={historyType} historyData={historyData} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pane6bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}> 종합 직원 랭킹</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CardAccordion;

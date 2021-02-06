import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import HistoryButton from "./HistoryButton";
import Track from "./Track";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

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
    // textAlign: "right",
  },
  AccordionDetails: {},
  historyWrapper: {
    transform: "translateY(-5%)",
  },
  track: {
    transform: "translateY(-10%)",
  },
}));

const CardAccordion = (props) => {
  const classes = useStyles();
  const { lastUpdate } = props;
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("부서 이동");
  const [historyType, setHistoryType] = useState("dept");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClick = (selected) => {
    setSelected(selected);
  };

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
              <HistoryButton handleClick={handleClick} selected={selected} />
            </Grid>
            <Grid item className={classes.track}>
              <Track type="dept" />
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

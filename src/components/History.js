import React, { memo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import HistoryButton from "./HistoryButton";
import Track from "./Track";

const History = memo((props) => {
  const {
    historyType,
    historyData,
    expanded,
    handleChange,
    changeHistoryType,
    classes,
  } = props;
  return (
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
  );
});

export default History;

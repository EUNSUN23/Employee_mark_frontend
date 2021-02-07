import React, { memo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

const Rank = memo((props) => {
  const { expanded, handleChange, classes } = props;
  return (
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
          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
          varius pulvinar diam eros in elit. Pellentesque convallis laoreet
          laoreet.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
});

export default Rank;

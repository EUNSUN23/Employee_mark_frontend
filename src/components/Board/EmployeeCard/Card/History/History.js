import React, { memo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import TypeBtn from "../../../../TypeBtn";
import Track from "../../../../Statistics/Track";

const History = (props) => {
  const { type, data, expanded, handleChange, changeDataType, classes } = props;
  return (
    <>
      <Accordion
        square
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
        {expanded !== "panel1" ? null : (
          <AccordionDetails className={classes.AccordionDetails}>
            <Grid
              container
              item
              direction="column"
              spacing={4}
              className={classes.trackWrapper}
            >
              <Grid item>
                <TypeBtn
                  handleClick={changeDataType}
                  expanded={expanded}
                  selected={type ? type : "default"}
                />
              </Grid>
              <Grid item className={classes.track}>
                <Track type={type ? type : "dept"} data={data} />
              </Grid>
            </Grid>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
};

export default History;

import React, { memo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import TypeBtn from "../../../../TypeBtn";
import RankCard from "../../../../Statistics/RankCard/RankCard";

const Rank = memo((props) => {
  const { expanded, handleChange, classes, type, data, changeDataType } = props;

  console.log("Rank.js", type);
  return (
    <Accordion
      square
      expanded={expanded === "panel2"}
      onChange={handleChange("panel2")}
      className={expanded === "panel2" ? classes.whole : null}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pane6bh-content"
        id="panel2bh-header"
      >
        <Typography className={classes.heading}> 종합 직원 랭킹</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded !== "panel2" ? null : (
          <AccordionDetails className={classes.AccordionDetails}>
            <Grid
              container
              item
              spacing={3}
              direction="column"
              className={classes.rankCardWrapper}
            >
              <Grid item className={classes.rankTypeBtn}>
                <TypeBtn
                  handleClick={changeDataType}
                  expanded={expanded}
                  selected={type ? type : "default"}
                />
              </Grid>
              <Grid item className={classes.rankName}>
                {type === "steadRank" || type === null ? "근속일 :" : "연봉 :"}
              </Grid>
              <Grid item>
                <RankCard type={type ? type : "steadRank"} data={data} />
              </Grid>
            </Grid>
          </AccordionDetails>
        )}
      </AccordionDetails>
    </Accordion>
  );
});

export default Rank;

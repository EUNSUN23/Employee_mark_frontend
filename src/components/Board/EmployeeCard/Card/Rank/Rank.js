import React, { memo } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Svg from "../../../../../shared/svgIcons";
import { Grid } from "@material-ui/core";
import RankCard from "../../../Graph/RankCard/RankCard";
import Loader from "../../../../UI/Loader";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },

  unClicked: {
    flex: "1fr",
    padding: 1,
    color: "#039BE5",
    border: "1px solid #039BE5",
    backgroundColor: "transparent",
    cursor: "pointer",
    boxSizing: "content-box",
    alignItems: "flex-start",
    margin: 4,
    "&:focus": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
  },

  clicked: {
    flex: "1fr",
    padding: 1,
    cursor: "pointer",
    boxSizing: "content-box",
    alignItems: "flex-start",
    margin: 4,
    backgroundColor: "#0288D1",
    color: "white",
    border: "none",
    "&:focus": {
      backgroundColor: "#0288D1",
      color: "white",
      border: "none",
    },
  },
}));

const Rank = memo((props) => {
  const btnClasses = useStyles(); //버튼
  const {
    expanded,
    onChangeAccordion,
    classes,
    type,
    data,
    empInfo,
    getData,
    isLoading,
  } = props;

  const rankCard = isLoading ? (
    <Grid container justify="center">
      <Grid />
      <Loader size="small" />
      <Grid />
    </Grid>
  ) : (
    <RankCard data={data} />
  );

  const button_1 =
    type === "period" ? btnClasses.clicked : btnClasses.unClicked;

  const button_2 =
    type === "salary" ? btnClasses.clicked : btnClasses.unClicked;

  return (
    <>
      <Accordion
        square
        expanded={expanded === "panel2"}
        onChange={onChangeAccordion("panel2")}
      >
        <AccordionSummary
          expandIcon={<Svg name="ExpandMore" />}
          aria-controls="panel6bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.AccordionSummary_header}>
            종합 직원 랭킹
          </Typography>
        </AccordionSummary>

        {expanded !== "panel2" ? null : (
          <AccordionDetails className={classes.AccordionDetails}>
            <Grid
              container
              item
              spacing={4}
              direction="column"
              className={classes.rankCardWrapper}
            >
              <Grid item>
                <div className={btnClasses.wrapper}>
                  <Button
                    className={button_1}
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      getData(
                        "rank",
                        "period",
                        empInfo.emp_no,
                        empInfo.dept_name,
                        empInfo.title
                      );
                    }}
                  >
                    근속 랭킹
                  </Button>
                  <Button
                    className={button_2}
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      getData(
                        "rank",
                        "salary",
                        empInfo.emp_no,
                        empInfo.dept_name,
                        empInfo.title
                      );
                    }}
                  >
                    연봉 랭킹
                  </Button>
                </div>
              </Grid>
              {rankCard}
            </Grid>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
});

export default Rank;

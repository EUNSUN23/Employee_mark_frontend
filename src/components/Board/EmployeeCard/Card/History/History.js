import React, { memo, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Loader from "../../../../UI/Loader";
import SalaryHistory from "../../../../Graph/SalaryHistory/SalaryHistory";

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
    zIndex: 500,
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

const History = memo((props) => {
  const [historyType, setHistoryType] = useState();

  const btnClasses = useStyles(); //버튼
  const { data, isLoading, expanded, onChangeAccordion, classes } = props;

  const changeTypeHandler = (type) => {
    setHistoryType(type);
  };

  const trackType = historyType ? historyType : "salary";

  const historyContent =
    isLoading || !data ? (
      <Loader size="small" />
    ) : (
      <SalaryHistory data={data.salary[0]} />
    );
  return (
    <>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={onChangeAccordion("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel12bh-content"
          id="panel12bh-header"
        >
          <Typography className={classes.AccordionSummary_header}>
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
                <div className={btnClasses.wrapper}>
                  <Button
                    className={
                      historyType === null || historyType === "dept"
                        ? btnClasses.clicked
                        : btnClasses.unClicked
                    }
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableRipple
                    onFocus={() => changeTypeHandler("dept")}
                  >
                    부서 변동
                  </Button>
                  <Button
                    className={
                      historyType === "salary"
                        ? btnClasses.clicked
                        : btnClasses.unClicked
                    }
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableRipple
                    onFocus={() => {
                      changeTypeHandler("salary");
                    }}
                  >
                    연봉 변동
                  </Button>
                </div>
              </Grid>
              <Grid item className={classes.track}>
                {historyContent}
              </Grid>
            </Grid>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
});

export default History;

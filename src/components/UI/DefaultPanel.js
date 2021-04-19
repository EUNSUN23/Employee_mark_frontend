import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../shared/theme";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Svg from "../../shared/svgIcons";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { shallowEqual } from "react-redux";

const useStyles = makeStyles({
  AccordionSummary_header: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    flexBasis: "100%",
    flexShrink: 0,
  },
  contentWrapper: {
    height: "230px",
  },
  btnWrapper: {
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "15% 15%",
    gridGap: "10%",
    "& .unClicked": {
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
    "& .clicked": {
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
  },
});

const DefaultPanel = (props) => {
  const { name, children, expanded, type, getData, onChangeAccordion } = props;
  const classes = useStyles();

  const info = useSelector((state) => state.searchEmp.openedEmp);

  const panelName =
    name === "history" ? "부서이동 및 연봉변동" : "종합 직원 랭킹";
  const btnType1 = name === "history" ? "dept" : "period";
  const btnType2 = "salary";
  const btnText1 = name === "history" ? "부서 이동" : "근속 랭킹";
  const btnText2 = name === "history" ? "연봉 변동" : "연봉 랭킹";

  const button_1 = type === btnType1 ? "clicked" : "unClicked";
  const button_2 = type === btnType2 ? "clicked" : "unClicked";

  const getContent = (name, type, emp_no, dept_name, title) =>
    name === "history"
      ? getData(type)
      : getData(name, type, emp_no, dept_name, title);

  return (
    <>
      <Accordion
        square
        expanded={name === expanded}
        onChange={onChangeAccordion(name)}
      >
        <AccordionSummary
          expandIcon={<Svg name="ExpandMore" />}
          aria-controls="panel6bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.AccordionSummary_header}>
            {panelName}
          </Typography>
        </AccordionSummary>
        {expanded !== name ? null : (
          <AccordionDetails className={classes.AccordionDetails}>
            <Grid
              container
              item
              spacing={4}
              direction="column"
              className={classes.contentWrapper}
            >
              <Grid item>
                <div className={classes.btnWrapper}>
                  <Button
                    className={button_1}
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      getContent(
                        name,
                        btnType1,
                        info.emp_no,
                        info.dept_name,
                        info.title
                      );
                    }}
                  >
                    {btnText1}
                  </Button>
                  <Button
                    className={button_2}
                    variant="outlined"
                    size="small"
                    color="primary"
                    disableRipple
                    onClick={() => {
                      getContent(
                        name,
                        btnType2,
                        info.emp_no,
                        info.dept_name,
                        info.title
                      );
                    }}
                  >
                    {btnText2}
                  </Button>
                </div>
              </Grid>
              {children}
            </Grid>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
};

export default DefaultPanel;

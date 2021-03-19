import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import History from "./History/History";
import useEmployeeData from "../../../../hooks/useEmployeeData";
import Rank from "./Rank/Rank";
import { leftError } from "../../../../store/actions/searchEMP";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  AccordionSummary_header: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    flexBasis: "100%",
    flexShrink: 0,
  },

  trackWrapper: {
    height: "230px",
  },
  rankCardWrapper: {
    height: "130px",
    marginTop: -20,
    paddingLeft: 0,
  },
  track: {
    transform: "translateY(-15%)",
  },
  rankName: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "bold",
  },
}));

const CardAccordion = memo((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [data, getData] = useEmployeeData();

  const { emp_no, dept_name, title, left } = props;

  /*패널 클릭시 데이터 받아오기 */
  const onChangeAccordion = (panel) => (event, isExpanded) => {
    if (left) return dispatch(leftError("퇴사자입니다"));
    if (isExpanded) {
      setExpanded(panel);
      switch (panel) {
        case "panel1":
          getData("history", "default", emp_no, dept_name, title);
          return;
        case "panel2":
          getData("rank", "default", emp_no, dept_name, title);
          return;
        default:
          return;
      }
    } else {
      setExpanded(false);
    }
  };

  return (
    <div className={classes.root}>
      <History
        type={expanded === "panel1" ? data.type : null}
        data={expanded === "panel1" ? data.data : null}
        isLoading={data.isLoading}
        expanded={expanded}
        onChangeAccordion={onChangeAccordion}
        classes={classes}
      />
      <Rank
        type={expanded === "panel2" ? data.type : null}
        data={expanded === "panel2" ? data.data : null}
        empInfo={{ emp_no: emp_no, dept_name: dept_name, title: title }}
        isLoading={data.isLoading}
        expanded={expanded}
        onChangeAccordion={onChangeAccordion}
        getData={getData}
        classes={classes}
      />
    </div>
  );
});

export default CardAccordion;

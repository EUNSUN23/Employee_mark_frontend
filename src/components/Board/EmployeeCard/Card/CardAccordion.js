import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import History from "./History/History";
import useEmployeeData from "../../../../hooks/useEmployeeData";
import Rank from "./Rank/Rank";
import { searchError, setOpenedEmp } from "../../../../store/actions/searchEmp";

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
    height: "230px",
  },
}));

const CardAccordion = memo((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [data, getData] = useEmployeeData();

  const { emp_no, dept_name, title, left } = props;

  const onChangeAccordion = (panel) => (event, isExpanded) => {
    if (left) return dispatch(searchError("퇴사자입니다"));

    dispatch(setOpenedEmp({ emp_no, dept_name, title }));
    if (isExpanded) {
      setExpanded(panel);
      switch (panel) {
        case "history":
          getData("history", "default", emp_no, dept_name, title);
          return;
        case "rank":
          getData("rank", "default", emp_no, dept_name, title);
          return;
        default:
          return;
      }
    } else {
      setExpanded(false);
    }
  };

  const makeContent = (expanded, panel, data) => {
    return expanded === panel && { type: data.type, data: data.data };
  };

  return (
    <div className={classes.root}>
      <History
        type={makeContent(expanded, "history", data).type}
        data={makeContent(expanded, "history", data).data}
        isLoading={data.isLoading}
        expanded={expanded}
        onChangeAccordion={onChangeAccordion}
      />
      <Rank
        type={makeContent(expanded, "rank", data).type}
        data={makeContent(expanded, "rank", data).data}
        empInfo={{ emp_no: emp_no, dept_name: dept_name, title: title }}
        isLoading={data.isLoading}
        expanded={expanded}
        onChangeAccordion={onChangeAccordion}
        getData={getData}
      />
    </div>
  );
});

export default CardAccordion;

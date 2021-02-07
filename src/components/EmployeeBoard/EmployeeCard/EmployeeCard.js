import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import useDialog from "../../../hooks/useDialog";
import Contact from "../../UI/Contact";
import PersonIcon from "@material-ui/icons/Person";
import CardAccordion from "./Card/CardAccordion";

const useStyles = makeStyles(() => ({
  cardHeader: {
    paddingBottom: 5,
  },
  content: {
    margin: 0,
  },
  media: {},

  rankWrapper: {
    position: "relative",
  },
  rank: {
    "& span": {
      position: "absolute",
      right: -4,
      bottom: 215,
      fontSize: 15,
      fontWeight: "bold",
      color: "#222",
      width: 29,
      height: 29,
      backgroundColor: "#e7e7e7",
      borderRadius: "100%",
      textAlign: "center",
      padding: 5,
      lineHeight: 2,
    },

    textAlign: "center",
  },

  info: {
    position: "relative",
  },
  contact: {
    width: 25,
    height: 25,
    right: -57,
    top: 6,
    position: "absolute",
    color: "#0288D1",
    cursor: "pointer",
    "&:hover": {
      color: "#4FC3F7",
      boxShadow: "none",
    },
  },
  name: {
    position: "absolute",
    bottom: -30,
  },
  subHeader: {
    paddingTop: 30,
  },
}));

// const data = {
//   history: {
//     dept: [
//       { from: "2002-01-23", to: "2005-02-23", dept: "marketing" },
//       { from: "2005-02-24", to: "2007-01-24", dept: "service" },
//       { from: "2007-01-25", to: "2009-02-23", dept: "finance" },
//       { from: "2009-02-24", to: "2010-02-23", dept: "production" },
//     ],
//     salary: [
//       { from: "2002-01-23", to: "2005-02-23", salary: "20000" },
//       { from: "2005-02-24", to: "2007-01-24", salary: "30000" },
//       { from: "2007-01-25", to: "2009-02-23", salary: "40000" },
//       { from: "2009-02-24", to: "2010-02-23", salary: "20000" },
//     ],
//   },
//   rank: {
//     working: {
//       period: 2,
//       entire: 2,
//       dept: 1,
//       role: 3,
//     },
//     salary: {
//       period: 1,
//       entire: 1,
//       dept: 1,
//       role: 1,
//     },
//   },
// };

const EmployeeCard = (props) => {
  const [open, selectedValue, openDialog, handleClickList] = useDialog();
  const classes = useStyles();

  const { employeeInfo, rank, portrait } = props;

  const subHeader = employeeInfo.department + ", " + employeeInfo.role;

  /*
    Q.)
    employee 30만명 한번에 불러오는건 무리인데, 무한스크롤로 밑바닥 내려갈때마다
    일정 숫자만큼의 employee 불러오기? : Board컴포넌트에서. 
    첫 렌더링 시 history, rank정보 불러오기
   /api/emp/history?emp_no=10036 [get] 
   /api/emp/rank?emp_no=10036 [get]
   */

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          /*Avatar: 이미지 소스 넣을 수 있음(말그대로 avatar이미지용) */
          <Avatar src={portrait}></Avatar>
        }
        title={
          <span className={classes.info}>
            <PersonIcon className={classes.contact} onClick={openDialog} />
            <span className={classes.name}>
              {employeeInfo.name}
              {""}
              {""}
            </span>

            <Contact
              open={open}
              selectedValue={selectedValue}
              onClose={handleClickList}
              employeeInfo={employeeInfo}
            />
          </span>
        }
        subheader={<div className={classes.subHeader}>{subHeader}</div>}
      />
      <CardMedia className={classes.media} style={{ height: "180px" }}>
        <CardAccordion />
      </CardMedia>
      <CardContent className={classes.content}>
        <div className={classes.rankWrapper}>
          <Typography className={classes.rank} variant="h6" component="h2">
            <span>{rank}</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;

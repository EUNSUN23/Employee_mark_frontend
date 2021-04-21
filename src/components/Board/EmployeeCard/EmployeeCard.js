import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardAccordion from "./Card/CardAccordion";
import Svg from "../../../shared/svgIcons";
import theme from "../../../shared/theme";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    borderRadius: "2px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
  },
  cardHeader: {
    paddingBottom: 5,
  },
  content: {
    margin: 0,
  },
  avatar: {
    backgroundColor: "#EBF9CB ",
    width: "40px",
    height: "40px",
  },
  info: {
    position: "relative",
  },
  left: {
    backgroundColor: "transparent",
    color: "#f71409",
  },
  stay: {
    backgroundColor: "transparent",
    color: "#1679f1",
  },
  name: {
    width: 200,
    position: "absolute",
    bottom: -30,
  },
  subHeader: {
    paddingTop: 30,
  },
  award: {
    cursor: "pointer",
    position: "relative",
    height: "50px",
    color: "red",

    "& div": {
      position: "absolute",
      paddingLeft: "3px",
      marginTop: "-1px",
      "&::before": {
        position: "absolute",
        top: "-10%",
        left: "120%",
        width: "400%",
        display: "block",
        fontSize: "1%",
        [theme.breakpoints.up("sm")]: {
          width: "8vw",
        },
        content: '"임원급 연봉 수령자"',
        padding: "3px",
        boxShadow:
          "rgba(0, 0, 0, 0.3) 2px 1px 2px 0px, rgba(0, 0, 0, 0.14) 1px 0px 0px 0px",
        backgroundColor: "beige ",
        color: "#000",
        fontWeight: "bold",
        opacity: 0,
        transition: "all 0.5s",
      },

      "&:hover": {
        "&::before": {
          opacity: 1,
        },
      },
    },
  },
}));

const EmployeeCard = (props) => {
  const classes = useStyles(theme);

  const { emp_no, first_name, last_name, left, more, title, dept_name } = props;

  const subHeader = `${dept_name}, ${title}`;
  const name = `${first_name} ${last_name}`;

  const profileIcon = left ? (
    <div className={classes.left}>
      <Svg name="LeftEmployees" fontSize="large" />
    </div>
  ) : (
    <div className={classes.stay}>
      <Svg name="Employees" fontSize="large" />
    </div>
  );

  const moreInfo = more ? (
    <span className={classes.award}>
      <Svg name="Award" fontSize="small" component="div" />
    </span>
  ) : null;

  return (
    <div className={classes.cardContainer}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar className={classes.avatar}>{profileIcon}</Avatar>}
        title={
          <span className={classes.info}>
            <span className={classes.name}>
              {name} {moreInfo}
            </span>
          </span>
        }
        subheader={<div className={classes.subHeader}>{subHeader}</div>}
      />
      <CardAccordion
        emp_no={emp_no}
        dept_name={dept_name}
        title={title}
        left={left}
      />
    </div>
  );
};

export default memo(
  EmployeeCard,
  (prevProps, nextProps) =>
    !prevProps.currentEmp || prevProps.emp_no === nextProps.currentEmp
);

import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import CardAccordion from "./Card/CardAccordion";

const useStyles = makeStyles(() => ({
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

  info: {
    position: "relative",
  },
  left: {
    backgroundColor: "#e6e6e6",
    color: "grey",
  },

  stay: {
    backgroundColor: "skyblue",
    color: " #0288D1",
  },
  name: {
    width: 200,
    position: "absolute",
    bottom: -30,
  },
  subHeader: {
    paddingTop: 30,
  },
  more: {
    color: "red",
  },
}));

const EmployeeCard = memo((props) => {
  const classes = useStyles();

  const { emp_no, first_name, last_name, left, more, title, dept_name } = props;

  const subHeader = `${dept_name}, ${title}`;
  const name = `${first_name} ${last_name}`;

  return (
    <div className={classes.cardContainer}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar className={left ? classes.left : classes.stay}></Avatar>
        }
        title={
          <span className={classes.info}>
            <span className={classes.name}>
              {name}{" "}
              {more ? <AnnouncementIcon className={classes.more} /> : null}
            </span>
          </span>
        }
        subheader={<div className={classes.subHeader}>{subHeader}</div>}
      />
      <CardAccordion emp_no={emp_no} dept_name={dept_name} title={title} />
    </div>
  );
});

export default EmployeeCard;

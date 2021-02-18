import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import useDialog from "../../../hooks/useDialog";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import CardAccordion from "./Card/CardAccordion";

const useStyles = makeStyles(() => ({
  cardHeader: {
    paddingBottom: 5,
  },
  content: {
    margin: 0,
  },
  media: {},

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

  const {
    birth_date,
    emp_no,
    first_name,
    gender,
    hire_date,
    last_name,
    left,
    more,
  } = props;

  const subHeader = `${gender}, ${birth_date}`;
  const name = `${first_name} ${last_name}`;

  return (
    <Card className={classes.root}>
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
      <CardMedia className={classes.media} style={{ height: "180px" }}>
        <CardAccordion emp_no={emp_no} />
      </CardMedia>
      <CardContent className={classes.content}></CardContent>
    </Card>
  );
});

export default EmployeeCard;

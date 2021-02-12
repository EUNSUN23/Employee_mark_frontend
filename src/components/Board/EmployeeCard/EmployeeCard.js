import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import useDialog from "../../../hooks/useDialog";
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

const EmployeeCard = memo((props) => {
  const [open, selectedValue, openDialog, handleClickList] = useDialog();
  const classes = useStyles();

  const { employeeInfo, portrait } = props;

  const subHeader = employeeInfo.department + ", " + employeeInfo.role;

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Avatar src={portrait}></Avatar>}
        title={
          <span className={classes.info}>
            <PersonIcon className={classes.contact} onClick={openDialog} />
            <span className={classes.name}>{employeeInfo.name}</span>
          </span>
        }
        subheader={<div className={classes.subHeader}>{subHeader}</div>}
      />
      <CardMedia className={classes.media} style={{ height: "180px" }}>
        <CardAccordion />
      </CardMedia>
      <CardContent className={classes.content}></CardContent>
    </Card>
  );
});

export default EmployeeCard;

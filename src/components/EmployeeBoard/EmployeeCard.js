import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import useDialog from "../../hooks/useDialog";
import Contact from "../UI/Contact";
import PersonIcon from "@material-ui/icons/Person";

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

  lastUpdate: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#555",
    textDecoration: "underLine",
    fontSize: 13,
    // textAlign: "right",
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

const EmployeeCard = (props) => {
  const [open, selectedValue, openDialog, handleClickList] = useDialog();
  const classes = useStyles();

  const { employeeInfo, rank, chart, portrait, lastUpdate } = props;

  const subHeader = employeeInfo.department + ", " + employeeInfo.role;

  // const employeeInfo = `<div><div>${name}</div><div>${department},${role}</div></div>`;

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
      <CardMedia
        className={classes.media}
        style={{ height: "180px" }}
        image={chart ? chart /* chart : 성과 or 연봉 등 graph이미지*/ : null}
      />
      <CardContent className={classes.content}>
        <div className={classes.rankWrapper}>
          <Typography className={classes.rank} variant="h6" component="h2">
            <span>{rank}</span>
          </Typography>
          <Typography
            className={classes.lastUpdate}
            color="textSecondary"
            gutterBottom
          >
            <span>{lastUpdate} updated</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;

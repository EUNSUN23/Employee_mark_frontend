import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import OfflinePinIcon from "@material-ui/icons/OfflinePin";

const useStyles = makeStyles(() => ({
  content: {
    margin: 0,
  },
  actions: {
    marginTop: -20,
  },
  rankWrapper: {
    display: "flex",
    position: "relative",
  },
  rank: {
    "& span": {
      position: "absolute",
      left: 0,
      bottom: 0,
      fontSize: 18,
      color: "#555",
      width: 40,
      height: 40,
      border: "2px solid #555",
      borderRadius: "100%",
      textAlign: "center",
      padding: 5,
      lineHeight: 2,
    },

    flex: 1,

    textAlign: "center",
  },

  lastUpdate: {
    flex: 2,
    position: "absolute",
    left: "40%",
    bottom: 10,
    color: "#555",
    textDecoration: "underLine",
    fontSize: 13,
    // textAlign: "right",
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();

  const {
    name,
    rank,
    chart,
    portrait,
    department,
    office,
    lastUpdate,
    role,
  } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          /*Avatar: 이미지 소스 넣을 수 있음(말그대로 avatar이미지용) */
          <Avatar src={portrait}></Avatar>
        }
        action={
          /*IconButton: 아이콘의 wrapper. 안에 원하는 아이콘 넣기 */

          office ? <AccessAlarmsIcon /> : <OfflinePinIcon />
        }
        title={name}
        subheader={department + ", " + role}
      />
      <CardMedia
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
      <CardActions className={classes.actions}>
        <Button size="small">send Message</Button>
        <Button size="small">profile</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

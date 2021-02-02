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
import IconButton from "@material-ui/core/IconButton";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";

const useStyles = makeStyles(() => ({
  content: {
    margin: 0,
  },
  rank: {},
  info: {
    marginTop: 10,
    marginBottom: -10,
  },
  lastUpdate: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const { avatarSrc, title, subheader, description, imgSrc } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          /*Avatar: 이미지 소스 넣을 수 있음(말그대로 avatar이미지용) */
          <Avatar src={avatarSrc}></Avatar>
        }
        action={
          /*IconButton: 아이콘의 wrapper. 안에 원하는 아이콘 넣기 */

          <AccessAlarmsIcon />
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia style={{ height: "150px" }} image={imgSrc} />
      {/*CardMedia:아마도 성과 or 연봉 등 graph이미지*/}
      <CardContent className={classes.content}>
        <Typography className={classes.rank} variant="h6" component="h2">
          1st Ranked
        </Typography>
        <Typography
          className={classes.lastUpdate}
          color="textSecondary"
          gutterBottom
        >
          last update : 02/02/21
        </Typography>

        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
        <Typography className={classes.info} variant="body2" component="p">
          "Transfered 2 days ago"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">send Message</Button>
        <Button size="small">profile</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

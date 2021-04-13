import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  rankWrapper: {
    marginLeft: 23,
    marginTop: 20,
    // border: "1px solid red",
  },
  loaderWrapper: {
    border: "1px solid black",
    margin: "0 auto",
  },
  rank: {
    position: "relative",
    // margin: "0 auto",
    width: 150,
    "& .title": {
      fontSize: 13,
      // border: "1px solid blue",
      width: 60,
      "& span": {
        position: "absolute",
        marginLeft: 2,
        width: 25,
        height: 25,
        backgroundColor: "#e7e7e7",
        borderRadius: "100%",
        textAlign: "center",
        padding: 5,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: 15,
        fontWeight: "bold",
        color: "#222",
      },
    },
  },
}));

const rankTitle = ["부서", "전사", "직계"];
const RankCard = (props) => {
  const classes = useStyles();
  const { data, type } = props;

  const createRanks = (data, type) => {
    const rankContents = Object.keys(data).map((key, idx) => {
      return (
        <Grid item className={classes.rank} key={type + "_" + key} xs={4}>
          <Typography variant="h6" component="h2">
            <div className={`${classes.rank} title`}>
              {rankTitle[idx]}
              <span>{data[key]}위</span>
            </div>
          </Typography>
        </Grid>
      );
    });
    console.log(rankContents);
    return rankContents;
  };

  return (
    <Grid container direction="row" className={classes.rankWrapper}>
      {createRanks(data, type)}
    </Grid>
  );
};

export default RankCard;

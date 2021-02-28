import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  rankWrapper: {
    paddingLeft: 80,
  },
  loaderWrapper: {
    border: "1px solid black",
    margin: "0 auto",
  },
  rank: {
    position: "relative",
    margin: "0 auto",
    flexDirection: "column",
    paddingRight: 40,
    "& span": {
      position: "absolute",
      width: 25,
      height: 25,
      backgroundColor: "#e7e7e7",
      borderRadius: "100%",
      textAlign: "center",
      padding: 5,
      marginRight: 5,
      top: "50%",
      left: "57%",
      transform: "translate(-50%,-50%)",
      fontSize: 15,
      fontWeight: "bold",
      color: "#222",
    },
    "& .title": {
      fontSize: 13,
    },
  },
}));

const rankTitle = ["부서 내", "전사 내", "동일직계 내"];
const RankCard = (props) => {
  const classes = useStyles();
  const { data, type } = props;

  const createRanks = (data, type) => {
    const rankContents = Object.keys(data).map((key, idx) => {
      return (
        <Grid item className={classes.rank} key={type + "_" + key}>
          <Typography variant="h6" component="h2">
            <div className={`${classes.rank} title`}> {rankTitle[idx]}</div>
            <span>{data[key]}위</span>
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

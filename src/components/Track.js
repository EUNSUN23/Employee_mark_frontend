import React, { useState, useEffect } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  timeline: {
    transform: "rotate(-90deg)",
    margin: "0 auto",
    width: 30,
    padding: 0,
  },
  timelineContentContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    width: 10,
    zIndex: 500,
  },
  timelineYear: {
    position: "relative",
    flex: "2fr",
    alignItems: "flex-start",
    display: "inline-block",
    transform: "rotate(90deg)",
    textAlign: "center",
    minWidth: 50,
  },
  timelineInfo: {
    position: "relative",
    flex: "2fr",
    alignItems: "flex-end",
    display: "inline-block",
    transform: "rotate(90deg)",
    textAlign: "center",
    minWidth: 50,
  },
  timelineSeparator: {
    position: "relative",
    flex: "1fr",
    alignItems: "flex-center",
  },
  timelineDot: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: 0,
  },
  timelineDot_last: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: 0,
  },

  timelineConnector: {
    position: "absolute",
    height: "3.2rem",
    width: 2,
    backgroundColor: "secondary",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "-44%",
    transform: "translateY(-50%)",
  },
  timelineYearText_first: {
    position: "absolute",
    fontSize: 10,
    color: "black",
    right: "60%",
    bottom: "50%",
    transform: "translateY(-100%)",
  },
  timelineInfoText_first: {
    position: "absolute",
    fontSize: 11,
    color: "black",
    right: "55%",
    top: "50%",
    transform: "translateY(100%)",
  },
  timelineYearText: {
    position: "absolute",
    fontSize: 10,
    color: "black",
    right: "50%",
    bottom: "50%",
    transform: "translate(-40%,-100%)",
  },
  timelineInfoText: {
    position: "absolute",
    fontSize: 11,
    color: "black",
    right: "40%",
    top: "50%",
    transform: "translate(-50%,100%)",
  },
  timelineYearText_last: {
    position: "absolute",
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
    right: "60%",
    bottom: "10%",
    transform: "translateY(-100%)",
  },
  timelineInfoText_last: {
    position: "absolute",
    fontSize: 11,
    color: "black",
    right: "40%",
    top: "50%",
    transform: "translateY(100%)",
  },
  timelineIcon: {
    transform: "rotate(-90deg)",
  },
});

const Track = (props) => {
  const classes = useStyles();
  const { type } = props;

  return (
    <Timeline className={classes.timeline}>
      <TimelineItem
        align="alternate"
        className={classes.timelineContentContainer}
      >
        <TimelineOppositeContent className={classes.timelineYear}>
          <Typography
            color="textSecondary"
            className={classes.timelineYearText_first}
          >
            2002
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot className={classes.timelineDot} />
          <TimelineConnector
            className={classes.timelineConnector}
            variant="text"
          />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineInfo}>
          <Typography
            color="textSecondary"
            className={classes.timelineInfoText_first}
          >
            Finance
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineContentContainer}>
        <TimelineOppositeContent className={classes.timelineYear}>
          <Typography
            color="textSecondary"
            className={classes.timelineYearText}
          >
            2005
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot className={classes.timelineDot} />
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineInfo}>
          <Typography
            color="textSecondary"
            className={classes.timelineInfoText}
          >
            Sales
          </Typography>
        </TimelineContent>
      </TimelineItem>{" "}
      <TimelineItem className={classes.timelineContentContainer}>
        <TimelineOppositeContent className={classes.timelineYear}>
          <Typography
            color="textSecondary"
            className={classes.timelineYearText}
          >
            2005
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot className={classes.timelineDot} />
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineInfo}>
          <Typography
            color="textSecondary"
            className={classes.timelineInfoText}
          >
            Sales
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineContentContainer}>
        <TimelineOppositeContent className={classes.timelineYear}>
          <Typography
            color="textSecondary"
            className={classes.timelineYearText_last}
          >
            2009-현재
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot
            className={classes.timelineDot_last}
            color={type === "dept" || type === null ? "primary" : "secondary"}
          />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineInfo}>
          <Typography
            color="textSecondary"
            className={classes.timelineInfoText_last}
          >
            Production
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default Track;

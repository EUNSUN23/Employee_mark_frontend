import React from "react";
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
    transform: "rotate(270deg)",
    width: 100,
    margin: "0 auto",
    padding: 0,
  },
  timelineContentContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
  },
  timelineTopContent: {
    position: "relative",
    flex: "2fr",
    alignItems: "flex-start",

    display: "inline-block",
    transform: "rotate(-270deg)",
    textAlign: "center",
    minWidth: 50,
  },
  timelineBottomContent: {
    position: "relative",
    flex: "2fr",
    alignItems: "flex-end",

    display: "inline-block",
    transform: "rotate(-270deg)",
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
  timelineTopText_first: {
    position: "absolute",
    fontSize: 13,
    right: "55%",
    bottom: "50%",
  },
  timelineBottomText_first: {
    position: "absolute",
    fontSize: 13,
    right: "60%",
    top: "50%",
  },
  timelineTopText: {
    position: "absolute",
    fontSize: 13,
    right: "40%",
    bottom: "50%",
    transform: "translateX(-40%)",
  },
  timelineBottomText: {
    position: "absolute",
    fontSize: 13,
    right: "50%",
    top: "50%",
    transform: "translateX(-50%)",
  },
  timelineTopText_last: {
    position: "absolute",
    fontSize: 13,
    right: "55%",
    bottom: "50%",
  },
  timelineBottomText_last: {
    position: "absolute",
    fontSize: 13,
    right: "40%",
    top: "50%",
  },
  timelineIcon: {
    transform: "rotate(-90deg)",
  },
});

const Track = () => {
  const classes = useStyles();
  return (
    <Timeline className={classes.timeline}>
      <TimelineItem
        align="alternate"
        className={classes.timelineContentContainer}
      >
        <TimelineOppositeContent className={classes.timelineTopContent}>
          <Typography
            color="textSecondary"
            className={classes.timelineTopText_first}
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
        <TimelineContent className={classes.timelineBottomContent}>
          <Typography
            color="textSecondary"
            className={classes.timelineBottomText_first}
          >
            Finance
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineContentContainer}>
        <TimelineOppositeContent className={classes.timelineTopContent}>
          <Typography color="textSecondary" className={classes.timelineTopText}>
            2005
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot className={classes.timelineDot} />
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineBottomContent}>
          <Typography
            color="textSecondary"
            className={classes.timelineBottomText}
          >
            Sales
          </Typography>
        </TimelineContent>
      </TimelineItem>{" "}
      <TimelineItem className={classes.timelineContentContainer}>
        <TimelineOppositeContent className={classes.timelineTopContent}>
          <Typography color="textSecondary" className={classes.timelineTopText}>
            2005
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot className={classes.timelineDot} />
          <TimelineConnector className={classes.timelineConnector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineBottomContent}>
          <Typography
            color="textSecondary"
            className={classes.timelineBottomText}
          >
            Sales
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineContentContainer}>
        <TimelineOppositeContent className={classes.timelineTopContent}>
          <Typography
            color="textSecondary"
            className={classes.timelineTopText_last}
          >
            2009
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator className={classes.timelineSeparator}>
          <TimelineDot className={classes.timelineDot} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineBottomContent}>
          <Typography
            color="textSecondary"
            className={classes.timelineBottomText_last}
          >
            Production
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default Track;

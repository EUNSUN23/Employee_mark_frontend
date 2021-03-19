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
    bottom: "10%",
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
    right: "40%",
    bottom: "10%",
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
    bottom: 0,
    transform: "translateY(-50%)",
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
  const { data } = props;

  console.log("Track render", data);

  //한번에 다 받음.

  const createHistoryTrack = (data) => {
    let historyTrack = null;
    if (!data) {
      return;
    }
    const slicedHistory = data.slice(1, data.length - 1);
    console.log("slicedHistory", slicedHistory);
    historyTrack = (
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
              {data[0].from}
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
              {data[0].dept}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        {slicedHistory.map((data, idx) => {
          return (
            <TimelineItem
              className={classes.timelineContentContainer}
              key={data.from}
            >
              <TimelineOppositeContent className={classes.timelineYear}>
                <Typography
                  color="textSecondary"
                  className={classes.timelineYearText}
                >
                  {data.from}
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
                  {data.dept}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}

        <TimelineItem className={classes.timelineContentContainer}>
          <TimelineOppositeContent className={classes.timelineYear}>
            <Typography
              color="textSecondary"
              className={classes.timelineYearText_last}
            >
              {data[data.length - 1].from}
              ~현재
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator className={classes.timelineSeparator}>
            <TimelineDot className={classes.timelineDot_last} color="primary" />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineInfo}>
            <Typography
              color="textSecondary"
              className={classes.timelineInfoText_last}
            >
              {data[data.length - 1].dept}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    return historyTrack;
  };

  return createHistoryTrack(data);
};

export default Track;

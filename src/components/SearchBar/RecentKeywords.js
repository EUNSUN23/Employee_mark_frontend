import React, { useContext, memo } from "react";
import { KeywordsDispatchContext } from "./context/KeywordsContext";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import theme from "../../theme";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    top: 35,
    left: "53%",
    transform: "translateX(-100%)",
    [theme.breakpoints.only("sm")]: {
      transform: "translateX(-58%)",
    },
    [theme.breakpoints.only("xs")]: {
      transform: "translateX(-58%)",
    },
    border: "1px solid  #e7e7e7",
    boxSizing: "border-box",
    color: "black",
    padding: 0,
    backgroundColor: "white",
    "& :hover": {
      backgroundColor: "#e7e7e7",
    },
  },

  root: {
    padding: "0 189px 0 0",
    [theme.breakpoints.only("sm")]: {
      padding: "0 314px 0 0",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "0 150px 0 0",
    },
  },

  listItemText: {
    marginLeft: "5%",
  },
  listItemIcon: {
    cursor: "pointer",
    color: "grey",
    marginRight: "4%",
    "& :hover": {
      color: "red",
    },
  },
}));

const RecentKeywords = memo((props) => {
  const classes = useStyles();
  const { keywords } = props;
  const dispatch = useContext(KeywordsDispatchContext);

  const createList = (keywords) => {
    return keywords.map((el, idx) => {
      console.log("createKeywords", el);
      return (
        <ListItem
          key={`keywords_${el.index}`}
          divider={true}
          className={classes.root}
        >
          <ClearIcon
            className={classes.listItemIcon}
            onClick={() => dispatch({ type: "delete", index: el.index })}
            fontSize="small"
          />
          <ListItemText primary={el.value} className={classes.listItemText} />
        </ListItem>
      );
    });
  };
  return <List className={classes.container}>{createList(keywords)}</List>;
});

export default RecentKeywords;

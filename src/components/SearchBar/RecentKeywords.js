import React, { useContext } from "react";
import { KeywordsDispatchContext } from "./context/KeywordsContext";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    right: 0,
    border: "1px solid  #e7e7e7",
    width: "100%",
    boxSizing: "border-box",
    color: "black",
    padding: 0,
    backgroundColor: "white",
    "& :hover": {
      backgroundColor: "#e7e7e7",
    },
  },

  root: {
    // border: "2px solid green",
    padding: "0 12px",
  },

  listItemText: {
    marginLeft: "15%",
  },
  listItemIcon: {
    cursor: "pointer",
    color: "grey",
    marginLeft: "50%",
    "& :hover": {
      color: "red",
    },
    // border: "1px solid blue",
  },
}));

const RecentKeywords = (props) => {
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
          <ListItemText primary={el.value} className={classes.listItemText} />
          <ListItemSecondaryAction>
            <ClearIcon
              className={classes.listItemIcon}
              onClick={() => dispatch({ type: "delete", index: el.index })}
              fontSize="small"
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };
  return <List className={classes.container}>{createList(keywords)}</List>;
};

export default RecentKeywords;

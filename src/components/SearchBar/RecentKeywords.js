import React, { useContext } from "react";
import { KeywordsDispatchContext } from "./context/KeywordsContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";

const RecentKeywords = (props) => {
  const { keywords } = props;
  const dispatch = useContext(KeywordsDispatchContext);

  const createList = (keywords) => {
    keywords.map((el, idx) => {
      return (
        <ListItem key={`keywords_${el.index}`}>
          <ListItemText primary={el.value} />
          <ListItemSecondaryAction>
            <ClearIcon
              onClick={() => dispatch({ type: "delete", index: el.index })}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };
  return <List>{createList(keywords)}</List>;
};

export default RecentKeywords;

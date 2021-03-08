import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const ChartSelect = (props) => {
  const { onCheckHandler, checked } = props;
  const classes = useStyles();
  const [list, setList] = React.useState([
    "Customer Service",
    "Development",
    "Finance",
    "Human Resources",
    "Marketing",
    "Production",
    "Quality Management",
    "Research",
    "Sales",
  ]);

  useEffect(() => {
    console.log(checked);
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked ? checked.indexOf(value) : null;
    const newChecked = checked ? [...checked] : null;

    if (currentIndex !== null) {
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      onCheckHandler(newChecked);
    } else {
      onCheckHandler("Customer Service");
    }
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          const isChecked = checked ? checked.indexOf(value) !== -1 : false;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={isChecked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return <div>{customList(list)}</div>;
};

export default ChartSelect;

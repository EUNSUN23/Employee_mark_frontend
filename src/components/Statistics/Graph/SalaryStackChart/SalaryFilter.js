import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid black",
  },
  value: {
    border: "1px solid green",
  },
  button: {
    border: "1px solid red",
  },
}));

const SalaryFilter = () => {
  const classes = useStyles();
  const [value, setValue] = useState(40000);
  const [disabled, setDisabled] = useState(false);

  const onClickUp = () => {
    if (value >= 160000) return;
    const increased = value + 10000;
    setValue(increased);
  };

  const onClickDown = () => {
    if (value <= 40000) return;
    const decreased = value - 10000;
    setValue(decreased);
  };

  console.log("value", value);

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.value}>
        <span></span>
      </Grid>
      <Grid item container direction="column" className={classes.button}>
        <Grid item>
          <ArrowDropUpIcon
            size="medium"
            pointer="cursor"
            onClick={() => onClickUp()}
          />
        </Grid>
        <Grid item>
          <ArrowDropDownIcon
            size="medium"
            pointer="cursor"
            onClick={() => onClickDown()}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SalaryFilter;

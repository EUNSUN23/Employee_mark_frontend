import React, { memo } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    position: "absolute",
    top: "50%",
    transform: "translate(50%,-50%)",
    minWidth: 55,
    minHeight: 30,
    "& option": {
      fontSize: 14,
    },
  },
  selectInput: {
    color: "#222",
  },
}));

const RangeSelector = memo((props) => {
  const classes = useStyles();
  const { range, handleRangeChange } = props;

  const handleChange = (event) => {
    const { value } = event.target;
    handleRangeChange(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        value={range}
        onChange={handleChange}
        name="range"
        className={classes.selectInput}
        inputProps={{ "aria-label": "range" }}
      >
        <option value="">선택</option>
        <option value="above">이상</option>
        <option value="below">이하</option>
      </NativeSelect>
    </FormControl>
  );
});

export default RangeSelector;

import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(() => ({
  formControl: {
    position: "absolute",
    top: "50%",
    transform: "translate(50%,-50%)",
    minWidth: 60,
    "& option": {
      fontSize: 14,
    },
  },
  selectEmpty: {},
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
        className={classes.selectEmpty}
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

import React, { memo } from "react";
import { Input } from "../../../UI/Input";
import { withStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import theme from "../../../../shared/theme";

const NativeInput = withStyles({
  root: {
    position: "relative",
    width: "50px",
    "&:hover": {
      width: "50px",
      backgroundColor: "transparent",
    },
    [theme.breakpoints.up("lg")]: {
      width: "4.5vw",
      "&:hover": {
        width: "4.5vw",
        backgroundColor: "transparent",
      },
    },
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  input: {
    width: "5vw",
    backgroundColor: "transparent",
    position: "absolute",
    top: "-5%",
    right: "-10%",
    [theme.breakpoints.up("lg")]: {
      width: "4.5vw",
    },
  },
})(Input);

const StyledFormControl = withStyles({
  root: {
    transform: "translate(-120%,-10%)",
    width: "4.5vw",
    height: "7vh",
    "& option": {
      fontSize: "1.3vw",
      width: "5vw",
      color: "#000",
    },
    [theme.breakpoints.down("sm")]: {
      marginWidth: "3vw",
    },
  },
})(FormControl);

const StyledSelect = withStyles({
  select: {
    position: "relative",
    width: "5vw",
    height: "30px",
    fontSize: "10px",
    lineHeight: "30px",
    padding: "0 5px",
    borderBottom: "1px solid #fff",
    "&::focus": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    position: "absolute",
    right: "-5%",
    top: "0%",
    color: "#fff",
    width: "20px",
  },
})(NativeSelect);

const RangeSelector = memo((props) => {
  const { range, handleRangeChange } = props;

  const handleChange = (event) => {
    const { value } = event.target;
    handleRangeChange(value);
  };

  return (
    <StyledFormControl component="section">
      <StyledSelect
        input={
          <NativeInput
            name="range"
            inputProps={{ "aria-label": "range" }}
            onChange={handleChange}
            value={range || "선택"}
          />
        }
        required={true}
        component="article"
      >
        <option value="">선택</option>
        <option value="above">이상</option>
        <option value="below">이하</option>
      </StyledSelect>
    </StyledFormControl>
  );
});

export default RangeSelector;

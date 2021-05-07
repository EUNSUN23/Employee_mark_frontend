import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSalary } from "../../../../shared/utility";
import { initDist } from "../../../../store/actions/statPage";
import { setArea, initArea } from "../../../../store/actions/statBar";
import { setSelected } from "../../../../store/actions/statBar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Input } from "../../../UI/Input";
import { SalarySlider } from "../../../UI/SalarySlider";
import RangeSelector from "./RangeSelector";
import theme from "../../../../shared/theme";
import mark from "./mark";

const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 7vh;
  width: 55vw;
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-template-rows: auto;
  align-items: center;
  @media only screen and (max-width: 992px) {
    width: 50vw;
    grid-template-columns: 2fr 1fr;
  }
`;

const InputContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  align-items: center;
  justify-content: space-between;
  grid-gap: 3vw;
  .gridSpace {
    display: none;
  }
  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 5fr 1fr;
    align-items: flex-end;
    .gridSpace {
      display: block;
    }
  }
`;

const StyledInput = withStyles({
  root: {
    transform: "translateY(-20%)",
    color: "#fff",
    width: "12vw",
    "&:hover": {
      width: "12vw",
    },
    fontSize: "12px",
    [theme.breakpoints.up("lg")]: {
      width: "8vw",
      fontSize: "14px",
      "&:hover": {
        width: "8vw",
      },
    },
  },
  input: {
    paddingLeft: "0.8vw",
    width: "12vw",
    color: "#fff",
    [theme.breakpoints.up("lg")]: {
      width: "7.5vw",
    },
  },
})(Input);

const BackBtn = withStyles({
  contained: {
    position: "absolute",
    top: "50%",
    right: "-20vw",
    width: "14vw",
    fontSize: "10px",
    color: "white",
    height: "6vh",
    border: "1px solid #fff",
    transform: "translateY(-50%)",
    boxShadow: "none",

    "&:hover": {
      boxShadow: "none",
    },
    [theme.breakpoints.up("lg")]: {
      right: "0%",
      width: "8vw",
    },
  },
})(Button);

const SearchTrack = () => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(null);
  const [value, setValue] = useState(0);

  const trackType = range === "above" ? "inverted" : true;

  useEffect(() => {
    if (range && value) {
      const area = { type: range, salary: value };
      dispatch(setArea(area));
    } else {
      dispatch(initArea());
      dispatch(initDist());
    }
  }, [range, value, dispatch]);

  const handleRangeChange = useCallback(
    (range) => {
      setRange(range);
    },
    [setRange]
  );

  const handleSliderChange = (event, newValue) => {
    const left = parseInt(event.target.style.left);
    const value = setSalary(left, newValue);
    setRange(null);
    setValue(value);
  };

  const handleInputChange = (event) => {
    event.stopPropagation();
    setRange(null);
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 40000) {
      setValue(40000);
    } else if (value > 160000) {
      setValue(160000);
    }
  };

  const onClickBackBtn = () => {
    dispatch(setSelected(null));
  };

  return (
    <Container>
      <InputContainer>
        <div className="gridSpace" />
        <SalarySlider
          track={trackType}
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={40000}
          max={160000}
          marks={mark}
        />

        <StyledInput
          name="salaryRange"
          value={value}
          onChange={(e) => handleInputChange(e)}
          onBlur={handleBlur}
          inputProps={{
            min: 40000,
            max: 160000,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        <RangeSelector range={range} handleRangeChange={handleRangeChange} />
      </InputContainer>
      <BackBtn
        variant="contained"
        color="primary"
        onClick={() => onClickBackBtn()}
      >
        돌아가기
      </BackBtn>
    </Container>
  );
};

export default SearchTrack;

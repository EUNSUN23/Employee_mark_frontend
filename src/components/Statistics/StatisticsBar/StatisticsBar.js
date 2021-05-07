import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getStatAPI } from "../../../store/actions/statPage";
import DefaultAppBar from "../../UI/AppBar/DefaultAppBar";
import SearchInput from "./components/SearchInput";
import SubmitBtn from "../../UI/AppBar/SubmitBtn";

const SearchContainer = styled.section`
  display: grid;
  grid-template-columns: 7fr 1fr;
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${(props) =>
    props.selected && props.selected.type === "area" ? "50vw" : "40vw"};
  height: 14vh;
  @media only screen and (max-width: 992px) {
    margin-left: ${(props) =>
      props.selected && props.selected.type === "area" ? 0 : "20%"};
    width: ${(props) =>
      props.selected && props.selected.type === "area" ? "50vw" : "60vw"};
  }
`;

const Submit = styled.section`
  position: ${(props) =>
    props.selected && props.selected.type === "area" && "absolute"};
  right: ${(props) =>
    props.selected && props.selected.type === "area" && "5vw"};
  @media only screen and (max-width: 992px) {
    right: ${(props) =>
      props.selected && props.selected.type === "area" && "0vw"};
  }
`;

const StatisticsBar = () => {
  const dispatch = useDispatch();

  const { area, selected, isDeptSent, isEmpSent } = useSelector(
    (state) => ({
      selected: state.statBar.selected,
      area: state.statBar.area,
      isDeptSent: state.statBar.isDeptSent,
      isEmpSent: state.statBar.isEmpSent,
    }),
    shallowEqual
  );

  const getBarData = (isSent) => {
    if (isSent) return;
    return dispatch(getStatAPI(selected));
  };

  const onSubmitHandler = useCallback(() => {
    if (!selected) return window.alert("검색어를 입력하세요");
    switch (selected.type) {
      case "emp":
        return getBarData(isEmpSent);
      case "dept":
        return getBarData(isDeptSent);
      case "area":
        return dispatch(getStatAPI(area));
      default:
        return window.alert("검색어를 입력하세요");
    }
  }, [selected, getBarData, dispatch]);

  return (
    <DefaultAppBar type="statistics">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <SearchContainer selected={selected}>
          <SearchInput />
          <Submit selected={selected}>
            <SubmitBtn onSubmitHandler={onSubmitHandler}>검색</SubmitBtn>
          </Submit>
        </SearchContainer>
      </form>
    </DefaultAppBar>
  );
};

export default StatisticsBar;

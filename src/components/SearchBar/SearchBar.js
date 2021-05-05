import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SearchMenu from "./components/SearchMenu";
import { initKeywords, addKeywords } from "../../store/actions/keywords";
import { getEmpData } from "../../store/actions/searchEmp";
import { isValid } from "../../shared/utility";
import DefaultAppBar from "../UI/AppBar/DefaultAppBar";
import SubmitBtn from "../UI/AppBar/SubmitBtn";
import SearchName from "./components/SearchName";
import SearchDetail from "./components/SearchDetail";
import { searchError } from "../../store/actions/searchEmp";

const SearchContainer = styled.section`
  display: grid;
  grid-template-columns: 2fr 7fr 2fr;
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;
  grid-gap: 1vw;
  position: relative;
  margin-left: 8%;
  width: 70vw;
  height: 14vh;
  @media only screen and (min-width: 786px) {
    width: 50vw;
  }
  @media only screen and (max-width: 576px) {
    width: 70vw;
  }
`;

const SearchBar = () => {
  const dispatch = useDispatch();

  const { keywords, page, option, inputVal, optionVal } = useSelector(
    (state) => ({
      keywords: state.keywords.keywords,
      page: state.searchEmp.page,
      option: state.searchBar.option,
      inputVal: state.searchBar.inputVal,
      optionVal: state.searchBar.optionVal,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (keywords.length === 1) dispatch(initKeywords());
  }, []);

  const submitData = useCallback(() => {
    const dataObj =
      option === "이름검색" ? { category: "name", value: inputVal } : optionVal;
    if (!dataObj || !dataObj.value)
      return dispatch(searchError("검색어를 입력하세요"));
    dispatch(getEmpData(dataObj, page, "noPage"));
    dispatch(addKeywords(dataObj.category, dataObj.value));
  }, [
    option,
    optionVal,
    inputVal,
    isValid,
    dispatch,
    page,
    getEmpData,
    addKeywords,
  ]);

  const input = option === "이름검색" ? <SearchName /> : <SearchDetail />;

  return (
    <DefaultAppBar type="board">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitData();
        }}
      >
        <SearchContainer>
          <SearchMenu />
          {input}
          <SubmitBtn onSubmitHandler={submitData}>검색</SubmitBtn>
        </SearchContainer>
      </form>
    </DefaultAppBar>
  );
};

export default SearchBar;

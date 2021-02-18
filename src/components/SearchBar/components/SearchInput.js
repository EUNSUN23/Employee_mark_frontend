import React, { useEffect, useContext } from "react";
import { KeywordsDispatchContext } from "../context/KeywordsContext";
import RecentKeywords from "../RecentKeywords";
import SearchIcon from "@material-ui/icons/Search";
import SearchDetail from "./SearchDetail";
import InputBase from "@material-ui/core/InputBase";

const SearchInput = (props) => {
  const {
    searchOption,
    searchDetail,
    handleSearchDetail,
    category,
    classes,
    value,
    onChange,
    keywords,
    openKeywords,
  } = props;

  const dispatch = useContext(KeywordsDispatchContext);

  /*keywords = [{index:time, value:keyword},...] */
  useEffect(() => {
    if (keywords === null) {
      dispatch({ type: "init" });
    } else {
      console.log("LOCALSTORAGE SET_ITEM", keywords);
      localStorage.setItem("RECENT", JSON.stringify(keywords));
    }
  }, [keywords]);

  console.log("SEARCHINPUT", category);

  return searchOption === "이름검색" ? (
    <>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
      />
      {openKeywords && keywords ? <RecentKeywords keywords={keywords} /> : null}
    </>
  ) : (
    <SearchDetail
      category={searchOption === "부서검색" ? category.dept : category.title}
      selected={searchDetail}
      handleOptionClick={handleSearchDetail}
    />
  );
};

export default SearchInput;

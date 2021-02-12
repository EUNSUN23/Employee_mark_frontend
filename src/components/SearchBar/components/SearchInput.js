import React, { useState, useEffect } from "react";
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
  } = props;

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

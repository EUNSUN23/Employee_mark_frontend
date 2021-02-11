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
      />
    </>
  ) : (
    <SearchDetail
      category={category}
      selected={searchDetail}
      handleOptionClick={handleSearchDetail}
    />
  );
};

export default SearchInput;

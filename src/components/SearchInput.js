import React, { useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SearchDetail from "./SearchDetail";
import InputBase from "@material-ui/core/InputBase";

const SearchInput = (props) => {
  const { searchOption, searchDetail, handleSearchDetail, classes } = props;
  let category;

  const getCategory = async (searchOption) => {
    try {
      switch (searchOption) {
        case "부서검색":
          return;
        case "직급검색":
          return;
        default:
          return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory(searchOption);
  }, []);

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

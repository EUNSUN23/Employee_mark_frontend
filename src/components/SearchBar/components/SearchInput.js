import React, { useEffect, useContext, memo } from "react";
import { KeywordsDispatchContext } from "../context/KeywordsContext";

import SearchIcon from "@material-ui/icons/Search";
import SearchDetail from "./SearchDetail";
import InputBase from "@material-ui/core/InputBase";

const SearchInput = memo((props) => {
  const {
    searchOption,
    searchDetail,
    handleSearchDetail,
    category,
    classes,
    value,
    onChange,
    handleKeywords,
  } = props;

  const dispatch = useContext(KeywordsDispatchContext);

  const initLocalStorage = () => {
    dispatch({ type: "init" });
  };

  useEffect(() => {
    initLocalStorage();
  }, []);

  const createSearchInput = (searchOption) => {
    let searchInput;

    searchInput =
      searchOption === "이름검색" ? (
        <div className={classes.search_input}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            className={classes.searchInput}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={value}
            onChange={onChange}
            onFocus={() => handleKeywords(true)}
            onBlur={() => handleKeywords(false)}
          />
        </div>
      ) : (
        <div className={classes.search_select}>
          <SearchDetail
            category={
              searchOption === "부서검색" ? category.dept : category.title
            }
            selected={searchDetail}
            handleOptionClick={handleSearchDetail}
          />
        </div>
      );

    return searchInput;
  };

  return <>{createSearchInput(searchOption)}</>;
});

export default SearchInput;

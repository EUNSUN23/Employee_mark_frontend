import React, { memo } from "react";
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
    keywords,
  } = props;

  const createSearchInput = (searchOption) => {
    let searchInput;
    switch (searchOption) {
      case "이름검색":
        searchInput = (
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
              onBlur={() => handleKeywords(true)}
            />
          </div>
        );
        return searchInput;
      case "부서검색":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetail
              category={category.dept}
              selected={searchDetail}
              handleOptionClick={handleSearchDetail}
            />
          </div>
        );
        return searchInput;
      case "직급검색":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetail
              category={category.title}
              selected={searchDetail}
              handleOptionClick={handleSearchDetail}
            />
          </div>
        );
        return searchInput;
      case "최근검색":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetail
              category={keywords}
              selected={searchDetail}
              handleOptionClick={handleSearchDetail}
            />
          </div>
        );
        return searchInput;
      default:
        return;
    }
  };

  return <>{createSearchInput(searchOption)}</>;
});

export default SearchInput;

import React, { memo } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SearchDetail from "./SearchDetail";
import InputBase from "@material-ui/core/InputBase";

const SearchInput = memo((props) => {
  const {
    searchOption,
    searchDetail,
    handleSearchDetail,
    classes,
    value,
    onChange,
    handleKeywords,
  } = props;

  const searchInput =
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
          onBlur={() => handleKeywords(true)}
        />
      </div>
    ) : (
      <div className={classes.search_select}>
        <SearchDetail
          selected={searchDetail}
          handleOptionClick={handleSearchDetail}
        />
      </div>
    );

  return searchInput;
});

export default SearchInput;

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import SearchDetail from "./SearchDetail";
import InputBase from "@material-ui/core/InputBase";

const SearchInput = memo((props) => {
  const {
    searchDetail,
    handleSearchDetail,
    classes,
    value,
    onChange,
    handleKeywords,
  } = props;
  const option = useSelector((state) => state.searchBar.option);
  const name = useSelector((state) => state.searchBar.inputVal);

  const searchInput =
    option === "이름검색" ? (
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
          value={name}
          onChange={onChange}
          onFocus={() => handleKeywords(true)}
          onBlur={() => handleKeywords(true)}
        />
      </div>
    ) : (
      <div className={classes.search_select}>
        <SearchDetail />
      </div>
    );

  return searchInput;
});

export default SearchInput;

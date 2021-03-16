import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import SearchDetail from "./SearchDetail";
import InputBase from "@material-ui/core/InputBase";
import { openKeywords } from "../../../store/actions/keywords";
import useInput from "../../../hooks/useInput";

const SearchInput = memo((props) => {
  const { classes } = props;
  const [name, setName] = useInput("");
  const dispatch = useDispatch();
  const option = useSelector((state) => state.searchBar.option);

  const handleKeywords = (bool) => {
    dispatch(openKeywords(bool));
  };

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
          onChange={setName}
          onFocus={() => handleKeywords(true)}
          onBlur={() => handleKeywords(false)}
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

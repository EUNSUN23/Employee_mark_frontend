import React, { memo } from "react";
import { useSelector } from "react-redux";
import SearchDetailOption from "../components/SearchDetailOption";
import SearchTrack from "../components/SearchTrack";

const SearchInput = memo((props) => {
  const { classes } = props;
  const detail = useSelector((state) => state.statBar.detail);

  const createSearchInput = () => {
    let searchInput;
    switch (detail) {
      case "조직별 통계":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetailOption />
          </div>
        );
        return searchInput;
      case "급여별 통계":
        searchInput = (
          <div className={classes.search_track}>
            <SearchTrack />
          </div>
        );
        return searchInput;

      default:
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetailOption />
          </div>
        );
        return searchInput;
    }
  };

  return <>{createSearchInput()}</>;
});

export default SearchInput;

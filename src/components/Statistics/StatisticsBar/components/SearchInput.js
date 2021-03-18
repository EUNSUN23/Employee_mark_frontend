import React, { memo } from "react";
import { useSelector } from "react-redux";
import SearchDetailOption from "../components/SearchDetailOption";
import SearchTrack from "../components/SearchTrack";

const SearchInput = memo((props) => {
  const { classes } = props;
  const optionDetail = useSelector((state) => state.statBar.optionDetail);

  const createSearchInput = () => {
    let searchInput;
    switch (optionDetail) {
      case "조직":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetailOption />
          </div>
        );
        return searchInput;
      case "급여":
        searchInput = (
          <div
            className={classes.search_track}
            style={{ border: "1px solid red" }}
          >
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

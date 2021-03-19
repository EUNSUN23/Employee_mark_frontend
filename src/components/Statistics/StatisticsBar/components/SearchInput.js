import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import SearchDetailOption from "../components/SearchDetailOption";
import SearchTrack from "../components/SearchTrack";

const SearchInput = memo((props) => {
  const { classes } = props;
  const optionDetail = useSelector((state) => state.statBar.optionDetail);

  const createSearchInput = () => {
    let searchInput;
    switch (optionDetail) {
      case "조직":
        searchInput = <SearchDetailOption className={classes.search_select} />;
        return searchInput;
      case "급여":
        searchInput = (
          <SearchTrack
            className={classes.search_track}
            style={{ border: "1px solid red" }}
          />
        );
        return searchInput;

      default:
        searchInput = <SearchDetailOption className={classes.search_select} />;
        return searchInput;
    }
  };

  return createSearchInput();
});

export default SearchInput;

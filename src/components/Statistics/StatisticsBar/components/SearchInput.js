import React, { memo } from "react";
import SearchDetailOption from "../components/SearchDetailOption";
import SearchTrack from "../components/SearchTrack";

const SearchInput = memo((props) => {
  const {
    searchOption,
    searchDetail,
    handleSearchDetail,
    category,
    classes,
  } = props;

  const createSearchInput = (searchOption) => {
    let searchInput;
    switch (searchOption) {
      case "":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetailOption
              category={category.dept}
              selected={searchDetail}
              handleOptionClick={handleSearchDetail}
            />
          </div>
        );
        return searchInput;
      case "조직별 통계":
        searchInput = (
          <div className={classes.search_select}>
            <SearchDetailOption
              category={category.dept}
              selected={searchDetail}
              handleOptionClick={handleSearchDetail}
            />
          </div>
        );
        return searchInput;
      case "급여별 통계":
        searchInput = (
          <div className={classes.search_track}>
            <SearchTrack
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

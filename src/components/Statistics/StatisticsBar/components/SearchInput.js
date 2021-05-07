import React, { memo } from "react";
import { useSelector } from "react-redux";
import SearchDetailOption from "../components/SearchDetailOption";
import SearchTrack from "../components/SearchTrack";

const SearchInput = memo(() => {
  const selected = useSelector((state) => state.statBar.selected);

  const createSearchInput = (selected) => {
    let searchInput;
    searchInput =
      selected && selected.type === "area" ? (
        <SearchTrack />
      ) : (
        <SearchDetailOption />
      );

    return searchInput;
  };

  return createSearchInput(selected);
});

export default SearchInput;

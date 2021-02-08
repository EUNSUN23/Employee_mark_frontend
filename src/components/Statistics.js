import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";

const Statistics = (props) => {
  const { location, initPage, isInitialized } = props;

  useEffect(() => {
    initPage();
  }, []);
  return (
    <>
      <SearchBar />
      <h1>Statistics</h1>
    </>
  );
};

export default Statistics;

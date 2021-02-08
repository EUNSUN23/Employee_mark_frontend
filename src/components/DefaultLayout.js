import React from "react";
import SearchBar from "./SearchBar";

const DefaultLayout = (props) => {
  const { children } = props;
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
};

export default DefaultLayout;

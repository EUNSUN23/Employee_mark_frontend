import React from "react";

const DefaultLayout = (props) => {
  const { children, location } = props;
  return <div>{children}</div>;
};

export default DefaultLayout;

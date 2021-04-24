import React, { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  line-height:170%;
  :hover {
      font-weight: bold;
`;

const NavLink = (props) => {
  const { endPoint, color, children } = props;
  return (
    <StyledLink to={endPoint} style={{ color: color }}>
      {children}
    </StyledLink>
  );
};

export default memo(NavLink);

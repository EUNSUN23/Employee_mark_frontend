import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  fontsize: 1.5vw;
  line-height:2.5vw;
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

export default NavLink;

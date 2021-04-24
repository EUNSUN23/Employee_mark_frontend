import React, { memo } from "react";
import styled from "styled-components";
import Svg from "../../shared/svgIcons";
import NavLink from "./NavLink";

export const Container = styled.ul`
  padding: 0;
  display: grid;
  grid-direction: column;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: flex-end;
  align-content: center;
`;

export const Nav = styled.li`
  display: grid;
  grid-gap: 5px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr auto;
  align-content: center;
  list-style: none;
`;

const secondNav = (type) =>
  type === "statistics" ? (
    <>
      <Svg name="EmployeeSearch" size="large" component="div" />
      <NavLink endPoint="/board" color="#fff">
        직원 검색
      </NavLink>
    </>
  ) : (
    <>
      <Svg name="SalaryStatistics" size="large" component="div" />
      <NavLink endPoint="/statistics" color="#fff">
        연봉통계
      </NavLink>
    </>
  );

const DeskNav = ({ type }) => {
  return (
    <Container>
      <Nav>
        <Svg name="Home" size="large" component="div" />
        <NavLink endPoint="/" color="#fff">
          홈으로
        </NavLink>
      </Nav>
      <Nav>{secondNav(type)}</Nav>
    </Container>
  );
};

export default memo(DeskNav);

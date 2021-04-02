import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmpRadar from "./Graph/EmpRadar";
import MainLoader from "../UI/MainLoader";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 5fr;
  grid-template-columns: 1fr;
`;

const Header = styled.h1`
  width: 100%;
  margin: 20px auto;
  text-align: center;
  border: 1px solid black;
`;

const NavTab = styled.ul`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  border: 1px solid black;
  width: 100%;
  padding: 0;
`;

const NavItem = styled.li`
  text-align: center;
  font-size: 20px;
  border: 1px solid black;
  list-style: none;
`;

const Main = styled.div`
  position: relative;
`;

const Home = () => {
  const { emp, total, loading } = useSelector((state) => ({
    emp: state.home.emp,
    total: state.home.total,
    loading: state.home.loading,
  }));

  const main = emp ? <EmpRadar data={emp} /> : null;
  const home = loading ? (
    <MainLoader />
  ) : (
    <Container>
      <Header>Employee Mark</Header>
      <NavTab>
        <NavItem>
          <NavLink to="/board">직원 검색</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/statistics">통계 그래프</NavLink>
        </NavItem>
      </NavTab>
      <Main>{main}</Main>
    </Container>
  );

  return home;
};

export default Home;

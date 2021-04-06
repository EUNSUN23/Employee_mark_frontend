import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmpRadar from "./Graph/EmpRadar";
import MainLoader from "../UI/MainLoader";

const Container = styled.div`
  display: grid;
  height: 90%;
  grid-template-rows: 1fr 4.5fr 1fr;
  grid-template-columns: 1fr;
  grid-gap: 2vh;
  padding-bottom: 30px;
  justify-items: center;
  align-contents: center;
`;

const Header = styled.h1`
  width: 100%;
  margin: 0 auto;
  padding-top: 5vh;
  font-size: 5.5vw;
  text-align: center;
`;

const NavTab = styled.ul`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  width: 45%;
`;

const NavItem = styled.li`
  text-align: center;
  font-size: 2vw;
  border-radius: 5px;
  background-color: #2196f3;
  list-style: none;
  padding: 5% 15%;
  line-height: 300%;
  a {
    text-decoration: none;
    color: #fff;
  }
`;

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
      <Main>{main}</Main>
      <NavTab>
        <NavItem>
          <NavLink to="/board" component="a">
            직원 검색
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/statistics" component="a">
            연봉 통계
          </NavLink>
        </NavItem>
      </NavTab>
    </Container>
  );

  return home;
};

export default Home;

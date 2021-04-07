import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmpRadar from "./Graph/EmpRadar";
import MainLoader from "../UI/MainLoader";
import Svg from "../../shared/svgIcons";

const Container = styled.div`
  display: grid;
  height: 90%;
  grid-template-rows: 1fr 5.5fr;
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
  position: absolute;
  top: 20%;
  display: grid;
  grid-gap: 2vh;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  width: 20%;
`;

const NavItem = styled.li`
  position: relative;
  text-align: center;
  font-size: 1.8vw;
  border-radius: 5px;
  background-color: #2196f3;
  padding: 2% 20%;
  list-style: none;

  a {
    text-decoration: none;
    color: #fff;
  }
  span {
    position: relative;
    left: 20%;
    line-height: 300%;
  }
  div {
    position: absolute;
    left: 10%;
    top: 20%;
  }
`;

const Main = styled.div`
  position: relative;
  border: 1px solid black;
  width: 70%;
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
            <Svg name="EmployeeSearch" fontSize="large" component="div" />
            <span>직원 검색</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/statistics" component="a">
            <Svg name="SalaryStatistics" fontSize="large" component="div" />
            <span>연봉 통계</span>
          </NavLink>
        </NavItem>
      </NavTab>
    </Container>
  );

  return home;
};

export default Home;

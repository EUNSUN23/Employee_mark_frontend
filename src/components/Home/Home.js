import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmpRadar from "./Graph/EmpRadar";
import Loader from "../UI/Loader";
import Svg from "../../shared/svgIcons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Container = styled.div`
  display: grid;
  height: 90%;
  grid-template-rows: 1fr 7fr;
  @media only screen and (min-width: 768px) {
    grid-template-rows: 1fr 5.5fr;
    height: 80%;
  }
  grid-template-columns: 1fr;
  grid-gap: 0vh;
  @media only screen and (min-width: 768px) {
    grid-gap: 8vh;
  }
  padding-bottom: 30px;
  justify-items: center;
  align-contents: center;
`;

const Header = styled.h1`
  width: 100%;
  margin: 0 auto;
  padding-top: 9vh;
  @media only screen and (min-width: 769px) {
    padding-top: 11vh;
  }
  text-shadow: 2px 6px 4px #cecece;
  font-size: 5.5vw;
  text-align: center;
`;

const Employees = styled.div`
  position: absolute;
  top: 2%;
  right: 0;
  width: 20%;
  height: 25%;
  display: grid;
  margin-right: 40px;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`;

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.8vw;
  font-weight: bold;
  width: 100%;

  div {
    flex: 1%;
    color: #1679f1;
  }
  h4 {
    flex: 10%;
  }
  span {
    flex: 20%;
    margin-left: -10%;
    font-size: 1.2vw;
  }
`;

const Left = styled(Total)`
  div {
    color: #f71409;
  }
`;

const NavTab = styled.ul`
  position: absolute;
  top: 3%;
  display: grid;
  grid-gap: 3vh;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  width: 20%;
`;

const NavItem = styled.li`
  position: relative;
  z-index: 500;
  text-align: center;
  font-size: 1.8vw;
  border-radius: 5px;
  background-color: #2196f3;
  padding: 2% 20%;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    background-color: #35c265;
  }
  cursor: pointer;

  .link {
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
  width: 80%;
  height: 100%;
`;

const Home = () => {
  const { emp, total, left, loading } = useSelector((state) => ({
    emp: state.home.emp,
    total: state.home.total,
    left: state.home.left,
    loading: state.home.loading,
  }));

  const overMd = useMediaQuery("(min-width:768px)");
  const iconSize = overMd ? "large" : null;

  const main = emp ? <EmpRadar data={emp} /> : null;

  const home = loading ? (
    <Loader type="main" />
  ) : (
    <Container>
      <Header>Employee Mark</Header>
      <Employees>
        <Total>
          <Svg name="Employees" fontSize={iconSize} component="div" />
          <h4>Total :</h4>
          <span>{total}명</span>
        </Total>
        <Left>
          <Svg name="LeftEmployees" fontSize={iconSize} component="div" />
          <h4>Left :</h4>
          <span>{left}명</span>
        </Left>
      </Employees>
      <Main>{main}</Main>
      <NavTab>
        <NavItem>
          <NavLink to="/board" className="link">
            <Svg name="EmployeeSearch" fontSize={iconSize} component="div" />
            <span>직원 검색</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/statistics" className="link">
            <Svg name="SalaryStatistics" fontSize={iconSize} component="div" />
            <span>연봉 통계</span>
          </NavLink>
        </NavItem>
      </NavTab>
    </Container>
  );

  return home;
};

export default Home;

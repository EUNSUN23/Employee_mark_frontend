import React, { memo } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Svg from "../../../shared/svgIcons";
import NavLink from "./NavLink";
import useMenuBtn from "../../../hooks/useMenuBtn";

const Container = styled.section`
display: block;
position: absolute;
top: 50%;
right: 5%;
transform: translate(-50%,-50%);
@media only screen and (max-width:576px){
  transform: translate(-25%,-50%);
}
@media only screen and (min-width:992px){
  display: none;
`;

const StyledMenu = styled(Menu)`
  padding: 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: center;
`;

const StyledMenuItem = styled(MenuItem)`
  display: grid;
  height: 14vh;
  line-height: 14vh;
  grid-gap: 5px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr auto;
  align-content: center;
  justify-items: center;
  list-style: none;
`;

const renderSecond = (type) =>
  type === "statistics" ? (
    <nav>
      <Svg name="EmployeeSearch" />
      <NavLink endPoint="/board" color="#000">
        직원 검색
      </NavLink>
    </nav>
  ) : (
    <nav>
      <Svg name="SalaryStatistics" />
      <NavLink endPoint="/statistics" color="#000">
        연봉 통계
      </NavLink>
    </nav>
  );

const MobileNav = ({ type }) => {
  const [navBtn, setNavBtn] = useMenuBtn(null);

  const isOpen = Boolean(navBtn.anchorEl);

  return (
    <Container>
      <IconButton
        aria-label="show more"
        aria-controls="search-employee-menu-mobile"
        aria-haspopup="true"
        onClick={setNavBtn.onClickAnchor}
        color="inherit"
      >
        <Svg name="More" />
      </IconButton>
      <StyledMenu
        anchorEl={navBtn.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="search-employee-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        onClose={setNavBtn.onClose}
      >
        <StyledMenuItem>
          <nav>
            <Svg name="Home" size="large" />
            <NavLink endPoint="/" color="#000">
              홈으로
            </NavLink>
          </nav>
        </StyledMenuItem>
        <StyledMenuItem>{renderSecond(type)}</StyledMenuItem>
      </StyledMenu>
    </Container>
  );
};

export default memo(MobileNav);

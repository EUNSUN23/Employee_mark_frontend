import React, { memo } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Svg from "../../shared/svgIcons";
import NavLink from "./NavLink";

import useMenuBtn from "../../hooks/useMenuBtn";

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
    <>
      <Svg name="EmployeeSearch" />
      <NavLink endPoint="/board" color="#000">
        직원 검색
      </NavLink>
    </>
  ) : (
    <>
      <Svg name="SalaryStatistics" />
      <NavLink endPoint="/statistics" color="#000">
        연봉 통계
      </NavLink>
    </>
  );

const MobileNav = ({ type }) => {
  const [navBtn, setNavBtn] = useMenuBtn(null);

  const isOpen = Boolean(navBtn.anchorEl);

  return (
    <>
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
          <Svg name="Home" size="large" />
          <NavLink endPoint="/" color="#000">
            홈으로
          </NavLink>
        </StyledMenuItem>
        <StyledMenuItem>{renderSecond(type)}</StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default memo(MobileNav);

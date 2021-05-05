import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DeskNav from "../Nav/DeskNav";
import MobileNav from "../Nav/MobileNav";

const Bar = styled(AppBar)`
  position: fixed;
  height: 14vh;
`;

const ToolBar = styled(Toolbar)`
  display: grid;
  grid-template-columns: auto 2fr auto;
  @media only screen and (min-width: 768px) {
    grid-template-columns: auto 3fr auto;
    grid-template-rows: auto;
  }
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.section`
display: none;
@media only screen and (min-width:992px){
  display: block;
  font-size: 2vw;
},
`;

const NavSection = styled.section`
  display: grid;
`;

const SearchSection = styled(Typography)`
  display: grid;
`;

const DefaultAppBar = (props) => {
  const { type, children } = props;

  return (
    <Bar component="header">
      <ToolBar>
        <Logo component="section">Employee Mark</Logo>
        <SearchSection>{children}</SearchSection>
        <NavSection>
          <DeskNav type={type} />
          <MobileNav type={type} />
        </NavSection>
      </ToolBar>
    </Bar>
  );
};

export default DefaultAppBar;

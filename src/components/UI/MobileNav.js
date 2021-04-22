import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Svg from "../../shared/svgIcons";
import useMenuBtn from "../../hooks/useMenuBtn";

// home: {
//     cursor: "pointer",
//     width: 80,
//     height: 30,
//     "& .icon_home": {
//       width: 28,
//       height: 28,
//     },
//     "&:hover": {
//       "& span": {
//         fontWeight: "bold",
//       },
//     },
//   },
//   secondNav: {
//     cursor: "pointer",
//     width: 100,
//     height: 30,
//     "& .icon_secondNav": {
//       width: 28,
//       height: 28,
//     },
//     "&:hover": {
//       "& span": {
//         fontWeight: "bold",
//       },
//     },
//   },

// link_mobile: {
//     color: "black",
//     textDecoration: "none",
//     "& span": {
//       paddingLeft: "5px",
//     },
//   },

const renderSecond = (type) =>
  type === "statistics" ? (
    <>
      <Svg name="EmployeeSearch" />
      <span>직원 검색</span>
    </>
  ) : (
    <>
      <Svg name="SalaryStatistics" />
      <span>연봉 통계</span>
    </>
  );

const MobileNav = ({ type }) => {
  const [navBtn, setNavBtn] = useMenuBtn(null);

  const isOpen = Boolean(navBtn.anchorEl);

  const secondLink = type === "statistics" ? "/board" : "/statistics";

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
      <Menu
        anchorEl={navBtn.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="search-employee-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        onClose={setNavBtn.onClose}
      >
        <Link to="/" className={classes.link_mobile}>
          <MenuItem>
            <Svg name="Home" size="large" />
            <span>홈으로</span>
          </MenuItem>
        </Link>
        <Link to={secondLink} className={classes.link_mobile}>
          <MenuItem>{renderSecond(type)}</MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default MobileNav;

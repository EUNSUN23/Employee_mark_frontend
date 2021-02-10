import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchMenu from "./SearchMenu";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
  },
  searchContainer: {
    paddingLeft: 50,
    display: "flex",
    flexDirection: "row",
  },
  home: {
    position: "relative",
    cursor: "pointer",
    width: 80,
    height: 30,
    flex: "1fr",
    border: "none",
    justifyContent: "space-between",
    "& span": {
      position: "absolute",
      right: 2,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "& .icon_home": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 29,
      height: 29,
    },
  },
  home_hover: {
    position: "relative",
    cursor: "pointer",
    width: 80,
    height: 30,
    flex: "1fr",
    justifyContent: "space-between",
    "& span": {
      position: "absolute",
      right: 2,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "& .icon_home": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 29,
      height: 29,
      border: "none",
    },
    borderBottom: "2px solid white",
  },
  statistics: {
    position: "relative",
    cursor: "pointer",
    flex: "2fr",
    width: 100,
    height: 30,
    border: "none",
    boxSizing: "content-box",
    justifyContent: "space-between",
    "& span": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: 0,
    },
    "& .icon_statistics": {
      top: "50%",
      transform: "translateY(-50%)",
      position: "absolute",
      width: 28,
      height: 28,
    },
  },
  statistics_hover: {
    position: "relative",
    cursor: "pointer",
    flex: "2fr",
    width: 100,
    height: 30,
    boxSizing: "content-box",
    justifyContent: "space-between",
    "& span": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: 0,
    },
    "& .icon_statistics": {
      top: "50%",
      transform: "translateY(-50%)",
      position: "absolute",
      width: 28,
      height: 28,
      border: "none",
    },
    borderBottom: "2px solid white",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const { location } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();
  const [searchOption, setSearchOption] = useState("이름검색");
  const [searchDetail, setSearchDetail] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const setIndicator = (target) => {
    setHover(target);
  };

  const changeBarType = (mode, location) => {
    console.log(location);
    switch (mode) {
      case "desktop":
        return location === "/board" ? (
          <>
            {" "}
            <AssessmentIcon
              className={
                hover === "statistics"
                  ? `${classes.statistics_hover} icon_statistics`
                  : `${classes.statistics} icon_statistics`
              }
            />
            <Typography component="span" noWrap>
              <Link to="/statistics" className={classes.link}>
                통계 검색
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <PeopleAltIcon
              className={
                hover === "statistics"
                  ? `${classes.statistics_hover} icon_statistics`
                  : `${classes.statistics} icon_statistics`
              }
            />
            <Typography component="span" noWrap>
              <Link to="/board" className={classes.link}>
                직원 검색
              </Link>
            </Typography>
          </>
        );
      case "mobile":
        return location === "/board" ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AssessmentIcon />
            </IconButton>
            <Link to="/statistics" className={classes.link}>
              통계 검색
            </Link>
          </>
        ) : (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <PeopleAltIcon />
            </IconButton>
            <Link to="/board" className={classes.link}>
              직원 검색
            </Link>
          </>
        );
    }
  };

  const mobileMenuId = "search-employee-menu-mobile";

  const handleOptionClick = (selected) => {
    setSearchOption(selected);
  };

  const handleSearchDetail = (selected) => {
    setSearchDetail(selected);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>
          <Link to="/" className={classes.link}>
            홈으로
          </Link>
        </p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        {changeBarType("mobile", location)}
      </MenuItem>
    </Menu>
  );
  {
    /********************구현 부분***************************/
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography classes={classes.title} variant="h6" noWrap>
            Employee Mark
          </Typography>
          <div className={classes.searchContainer}>
            <SearchMenu
              selected={searchOption}
              handleOptionClick={handleOptionClick}
            />
            <div className={classes.search}>
              <SearchInput
                searchOption={searchOption}
                searchDetail={searchDetail}
                handleSearchDetail={handleSearchDetail}
                classes={classes}
              />
            </div>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.menu}>
              <div
                className={hover === "home" ? classes.home_hover : classes.home}
                onMouseEnter={() => setIndicator("home")}
                onMouseLeave={() => setIndicator(null)}
              >
                <HomeIcon
                  className={
                    hover === "home"
                      ? `${classes.home_hover} icon_home`
                      : `${classes.home} icon_home`
                  }
                />
                <Typography component="span" noWrap>
                  <Link to="/" className={classes.link}>
                    홈으로
                  </Link>
                </Typography>
              </div>
              <div
                className={
                  hover === "statistics"
                    ? classes.statistics_hover
                    : classes.statistics
                }
                onMouseEnter={() => setIndicator("statistics")}
                onMouseLeave={() => setIndicator(null)}
              >
                {changeBarType("desktop", location)}
              </div>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default SearchBar;

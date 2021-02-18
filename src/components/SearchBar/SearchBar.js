import React, { useState, memo } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchMenu from "./components/SearchMenu";
import SearchInput from "./components/SearchInput";
import useInput from "../../hooks/useInput";
import useCategory from "../../hooks/useCategory";
import axios from "axios";

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
  submit: {
    color: "white",
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
  link_mobile: {
    color: "black",
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

const SearchBar = memo((props) => {
  const classes = useStyles();
  const { location, onSubmitHandler } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();
  const [searchOption, setSearchOption] = useState("이름검색");
  const [searchDetail, setSearchDetail] = useState(null);
  const [category, setCategory] = useCategory(null);
  const [name, setName] = useInput("");

  console.log("CATEGORY", category);

  const getCategory = async (type) => {
    // data = ["부서", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let res;
    let optionList;

    try {
      const url = `http://localhost:3008/api/${type}`;
      console.log(url);
      res = await axios.get(url);
      console.log(res.data.packet);
      optionList =
        type === "dept"
          ? res.data.packet.map((obj) => {
              return obj.dept_name;
            })
          : res.data.packet.map((obj) => {
              return obj.title;
            });

      optionList.unshift(type);
      console.log(type, optionList);
      setCategory(type, optionList);
    } catch (err) {
      console.log(err);
    }
  };

  const submitData = () => {
    let data;
    switch (searchOption) {
      case "이름검색":
        data = { category: "", value: name };
        console.log(data);
        onSubmitHandler(data);
        return;
      case "부서검색":
        data = { category: "dept", value: searchDetail };
        console.log(data);
        onSubmitHandler(data);
        return;
      case "직급검색":
        data = { category: "title", value: searchDetail };
        console.log(data);
        onSubmitHandler(data);
        return;
      default:
        return;
    }
  };

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
            <AssessmentIcon />
            통계 검색
          </>
        ) : (
          <>
            <PeopleAltIcon />
            직원 검색
          </>
        );
    }
  };

  const mobileMenuId = "search-employee-menu-mobile";

  const handleSearchDetail = (selected) => {
    console.log("handle search detail", selected);
    setSearchDetail(selected);
  };

  const handleOptionClick = (selected) => {
    handleSearchDetail(null);
    setSearchOption(selected);

    if (selected === "부서검색") {
      getCategory("dept");
    } else {
      getCategory("title");
    }
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
      <Link to="/" className={classes.link_mobile}>
        <MenuItem>
          <HomeIcon />
          홈으로
        </MenuItem>
      </Link>
      <Link to="/statistics" className={classes.link_mobile}>
        <MenuItem>{changeBarType("mobile", location)}</MenuItem>
      </Link>
    </Menu>
  );
  {
    /********************구현 부분***************************/
  }
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
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
                category={category}
                classes={classes}
                value={name}
                onChange={setName}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              submitData();
            }}
            type="submit"
          >
            검색
          </Button>
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
});

export default SearchBar;

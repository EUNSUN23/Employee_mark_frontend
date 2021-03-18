import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Grid } from "@material-ui/core";
import SearchOption from "./components/SearchOption";
import SearchInput from "./components/SearchInput";
import { getStatAPI } from "../../../store/actions/statPage";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "row",
  },

  home: {
    cursor: "pointer",
    width: 80,
    height: 30,

    "& .icon_home": {
      width: 28,
      height: 28,
    },
  },
  home_hover: {
    "& span": {
      fontWeight: "bold",
    },
    "& .icon_home": {
      width: 30,
      height: 30,
    },
  },
  statistics: {
    cursor: "pointer",
    width: 100,
    height: 30,
    "& .icon_statistics": {
      width: 28,
      height: 28,
    },
  },
  statistics_hover: {
    "& span": {
      fontWeight: "bold",
    },
    "& .icon_statistics": {
      width: 30,
      height: 30,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    fontSize: 23,

    [theme.breakpoints.down("sm")]: {
      display: "none",
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
  searchContainer: {
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      width: "150%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "110%",
    },
  },

  submit: {
    color: "white",
  },
  search_track: {
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // marginLeft: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      // marginLeft: theme.spacing(5),
      width: "80%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "80%",
    },
  },
  search_select: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      marginLeft: theme.spacing(4.5),
      width: "80%",
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
  trackRoot: {
    color: "inherit",
    width: "100%",
  },
  trackInput: {
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
      display: "block",
    },
  },
  sectionMobile: {
    display: "block",
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translate(-50%,-50%)",
    [theme.breakpoints.down("xs")]: {
      transform: "translate(-25%,-50%)",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

// searchOption = "연봉통계"
// category = "조직별 통계", "급여별 통계"
// searchDetail = (카테고리:조직별)"전체"(/api/stat/distribution/emp/salary), "부서"(/api/stat/distribution/dept/salary) // (카테고리:급여별) - track컴포넌트

const StatisticsBar = memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();

  const optionDetail = useSelector((state) => state.statBar.optionDetail);
  const areaData = useSelector((state) => state.statBar.area);
  const selectedData = useSelector((state) => state.statBar.selected);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("onSubmit", optionDetail);
    switch (optionDetail) {
      case "조직":
        return dispatch(getStatAPI(selectedData));
      case "급여":
        return dispatch(getStatAPI(areaData));
      default:
        window.alert("검색어를 입력하세요");
        return;
    }
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const setIndicator = (target) => {
    setHover(target);
  };

  const changeBarType = (mode) => {
    switch (mode) {
      case "desktop":
        return (
          <>
            <Grid item>
              <PeopleAltIcon
                className={
                  hover === "statistics"
                    ? `${classes.statistics_hover} icon_statistics`
                    : `${classes.statistics} icon_statistics`
                }
              />
            </Grid>
            <Grid item>
              <Typography component="span" noWrap>
                <Link to="/board" className={classes.link}>
                  직원 검색
                </Link>
              </Typography>
            </Grid>
          </>
        );
      case "mobile":
        return (
          <>
            <PeopleAltIcon />
            직원 검색
          </>
        );

      default:
        return;
    }
  };

  const mobileMenuId = "search-employee-menu-mobile";

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
      <Link to="/board" className={classes.link_mobile}>
        <MenuItem>{changeBarType("mobile")}</MenuItem>
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
          <Grid container direction="row" className={classes.toolbarContainer}>
            <Grid
              item
              xs={false}
              sm={false}
              md={2}
              className={classes.titleContainer}
            >
              <Typography className={classes.title}>Employee Mark</Typography>
            </Grid>
            <Grid item xs={10} sm={8} md={7} className={classes.formContainer}>
              <form
                onSubmit={(e) => {
                  onSubmitHandler(e);
                }}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  className={classes.searchContainer}
                  style={{ border: "1px solid black" }}
                >
                  <Grid item xs={1} style={{ border: "1px solid black" }}>
                    <SearchOption />
                  </Grid>
                  <Grid item xs={10} style={{ border: "1px solid black" }}>
                    <SearchInput classes={classes} />
                  </Grid>
                  <Grid item item xs={1} style={{ border: "1px solid black" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={(e) => {
                        onSubmitHandler(e);
                      }}
                    >
                      검색
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item container xs={2} sm={2} md={3}>
              <Grid item container className={classes.sectionDesktop}>
                <Grid
                  item
                  container
                  className={classes.menu}
                  alignItems="center"
                  justify="flex-end"
                >
                  <Grid
                    item
                    xs={5}
                    container
                    alignItems="center"
                    justify="center"
                    className={
                      hover === "home" ? classes.home_hover : classes.home
                    }
                    onMouseEnter={() => setIndicator("home")}
                    onMouseLeave={() => setIndicator(null)}
                  >
                    <Grid item>
                      <HomeIcon
                        className={
                          hover === "home"
                            ? `${classes.home_hover} icon_home`
                            : `${classes.home} icon_home`
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Typography component="span" noWrap>
                        <Link to="/" className={classes.link}>
                          홈으로
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={5}
                    className={
                      hover === "statistics"
                        ? classes.statistics_hover
                        : classes.statistics
                    }
                    onMouseEnter={() => setIndicator("statistics")}
                    onMouseLeave={() => setIndicator(null)}
                  >
                    {changeBarType("desktop")}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
});

export default StatisticsBar;

import React, { useState, memo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
import SearchInput from "./components/SearchInput";
import { getStatAPI } from "../../../store/actions/statPage";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "row",
  },
  appBar: {
    height: "14vh",
    [theme.breakpoints.up("lg")]: {
      height: "10vh",
    },
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
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      fontSize: "2vw",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5vw",
  },
  link_mobile: {
    color: "black",
    textDecoration: "none",
  },
  searchContainer: {
    position: "relative",
    width: "100vw",
    height: "14vh",
    [theme.breakpoints.up("sm")]: {
      width: (props) =>
        props.selected && props.selected.type === "area" ? "70vw" : "48vw",
    },
  },

  submit: {
    color: "white",
    fontSize: "1.3vw",
    minWidth: "6vw",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: "45vw",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.3vw",
      minWidth: "4vw",
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

const StatisticsBar = memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();

  const { area, selected, isDeptSent } = useSelector(
    (state) => (
      {
        selected: state.statBar.selected,
        area: state.statBar.area,
        isDeptSent: state.statBar.isDeptSent,
      },
      shallowEqual
    )
  );

  const onSubmitHandler = (e, selected) => {
    e.preventDefault();
    console.log("onSubmit", selected);
    switch (selected) {
      case "전사 연봉 분포" || "부서별 연봉 분포":
        if (isDeptSent) return;
        return selected
          ? dispatch(getStatAPI(selected))
          : window.alert("검색어를 입력하세요");
      case "상세 연봉별 부서순위":
        return area
          ? dispatch(getStatAPI(area))
          : window.alert("검색어를 입력하세요");
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

  const changeLink = (mode) => {
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
        <MenuItem>{changeLink("mobile")}</MenuItem>
      </Link>
    </Menu>
  );

  {
    /********************구현 부분***************************/
  }
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Typography className={classes.title}>Employee Mark</Typography>
            <form
              onSubmit={(e) => {
                onSubmitHandler(e, selected);
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                selected={selected}
                className={classes.searchContainer}
              >
                <Grid item sm={9} md={8}>
                  <SearchInput classes={classes} />
                </Grid>
                <Grid item xs={1} md={1}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={(e) => {
                      onSubmitHandler(e, selected);
                    }}
                  >
                    검색
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid container xs={2} sm={2} md={3}>
              <Grid container className={classes.sectionDesktop}>
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
                    {changeLink("desktop")}
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

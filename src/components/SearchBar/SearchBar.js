import React, { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import SearchMenu from "./components/SearchMenu";
import SearchInput from "./components/SearchInput";
import { Grid } from "@material-ui/core";
import { initKeywords, addKeywords } from "../../store/actions/keywords";
import { getEmpData } from "../../store/actions/searchEmp";
import { isValid } from "../../shared/utility";
import theme from "../../theme";
import useAppBarStyles from "../../shared/useAppBarStyles";
import Svg from "../../shared/svgIcons";

const useStyles = makeStyles((defaultBar) => ({
  extend: defaultBar,
  search_input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: theme.spacing(3),
    width: "50%",
    [theme.breakpoints.only("sm")]: {
      marginLeft: theme.spacing(5),
      width: "80%",
    },
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(5),
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
  searchInput: {
    "&:hover": {
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
    width: "100%",
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
  searchOption: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      transform: "translateX(20%)",
    },
  },
  searchButton: {
    position: "relative",
    transform: "translateX(-140%)",
    [theme.breakpoints.only("sm")]: {
      transform: "translateX(5%)",
    },
    [theme.breakpoints.only("xs")]: {
      transform: "translateX(40%)",
    },
  },
}));

const SearchBar = memo(() => {
  const selected = { selected: null };
  const classes = useStyles(useAppBarStyles({ theme, selected }));
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [hover, setHover] = useState();

  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.keywords.keywords);
  const page = useSelector((state) => state.searchEmp.page);
  const option = useSelector((state) => state.searchBar.option);
  const inputVal = useSelector((state) => state.searchBar.inputVal);
  const optionVal = useSelector((state) => state.searchBar.optionVal);

  useEffect(() => {
    if (keywords.length === 0) dispatch(initKeywords());
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    if (option === "이름검색") {
      isValid(inputVal);
      dispatch(getEmpData(inputVal, page, "noPage"));
      dispatch(addKeywords("name", inputVal));
    } else {
      isValid(optionVal.value);
      dispatch(getEmpData(optionVal, page, "noPage"));
      dispatch(addKeywords(optionVal.category, optionVal.value));
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
              <Svg name="SalaryStatistics" />
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
            <Svg name="SalaryStatistics" />
            연봉 통계
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
      <Link to="/statistics" className={classes.link_mobile}>
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
                submitData(e);
              }}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.searchContainer}
              >
                <Grid item xs={2} className={classes.searchOption}>
                  <SearchMenu />
                </Grid>
                <Grid item xs={8} className={classes.searchInputContainer}>
                  <SearchInput classes={classes} />
                </Grid>
                <Grid item xs={2} className={classes.searchButton}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={(e) => {
                      submitData(e);
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

export default SearchBar;

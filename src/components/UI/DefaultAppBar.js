import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Svg from "../../shared/svgIcons";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import theme from "../../theme";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
  },
  appBar: {
    height: "14vh",
    [theme.breakpoints.up("xl")]: {
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
    "&:hover": {
      "& span": {
        fontWeight: "bold",
      },
      "& .icon_home": {
        width: 30,
        height: 30,
      },
    },
  },
  secondNav: {
    cursor: "pointer",
    width: 100,
    height: 30,
    "& .icon_secondNav": {
      width: 28,
      height: 28,
    },
    "&:hover": {
      "& span": {
        fontWeight: "bold",
      },
      "& .icon_secondNav": {
        width: 30,
        height: 30,
      },
    },
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
});

const DefaultAppBar = (props) => {
  const { type, children } = props;
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const mobileMenuId = "search-employee-menu-mobile";

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const secondNav = (type) =>
    type === "statistics" ? (
      <>
        <Grid item className="icon_secondNav">
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
    ) : (
      <>
        <Grid item className="icon_secondNav">
          <Svg name="EmployeeSearch" />
        </Grid>
        <Grid item>
          <Typography component="span" noWrap>
            <Link to="/statistics" className={classes.link}>
              연봉통계
            </Link>
          </Typography>
        </Grid>
      </>
    );

  const changeLink = (mode, type) => {
    switch (mode) {
      case "desktop":
        return <>{secondNav(type)}</>;
      case "mobile":
        return type === "statistics" ? (
          <>
            <Svg name="EmployeeSearch" />
            직원 검색
          </>
        ) : (
          <>
            <Svg name="SalaryStatistics" />
            연봉 통계
          </>
        );
      default:
        return;
    }
  };

  const renderMobileMenu = (type) => (
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
        <MenuItem>{changeLink("mobile", type)}</MenuItem>
      </Link>
    </Menu>
  );

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
            {children}
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
                    className={classes.home}
                  >
                    <Grid item>
                      <HomeIcon className="icon_home" />
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
                    className={classes.secondNav}
                  >
                    {secondNav(type)}
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
      {renderMobileMenu(type)}
    </div>
  );
};

export default DefaultAppBar;

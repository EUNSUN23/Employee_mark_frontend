import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeskNav from "../Nav/DeskNav";
import MobileNav from "../Nav/MobileNav";
import theme from "../../../shared/theme";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },

  appBar: {
    height: "14vh",
    [theme.breakpoints.up("xl")]: {
      height: "10vh",
    },
  },

  title: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
      fontSize: "2vw",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
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
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
});

const DefaultAppBar = (props) => {
  const { type, children } = props;
  const classes = useStyles();

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
            <Grid container item xs={2} sm={2} md={3}>
              <Grid container className={classes.sectionDesktop}>
                <DeskNav type={type} />
              </Grid>
              <Grid item className={classes.sectionMobile}>
                <MobileNav type={type} />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default DefaultAppBar;

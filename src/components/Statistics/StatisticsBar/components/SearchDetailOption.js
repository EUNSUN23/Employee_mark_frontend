import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Svg from "../../../../shared/svgIcons";
import theme from "../../../../theme";
import { setSelected } from "../../../../store/actions/statBar";

const useStyles = makeStyles(() => ({
  title_container: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    height: "8vh",
    [theme.breakpoints.up("xl")]: {
      height: "4.5vh",
      fontSize: "25px",
    },
  },
  title_listItemIcon: {
    position: "absolute",
    left: "0%",
    color: "white",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title_listItemText: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "25px",
    },
  },
  menu_container: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    height: "8vh",
    [theme.breakpoints.up("xl")]: {
      height: "4.5vh",
      fontSize: "25px",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const SearchDetailOption = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailTitle, setDetailTitle] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelectClick = (type) => {
    dispatch(setSelected({ type: type, salary: "default" }));
    handleClose();
    switch (type) {
      case "emp":
        return setDetailTitle("전사 연봉 분포");
      case "dept":
        return setDetailTitle("부서별 연봉 분포");
      default:
        return;
    }
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.title_container}
      >
        <ListItemIcon className={classes.title_listItemIcon}>
          <Svg name="ArrowDown" fontSize="large" component="div" />
        </ListItemIcon>
        <ListItemText
          primary={detailTitle ? detailTitle : "연봉 통계 그래프"}
          className={classes.title_listItemText}
        />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu_container}
      >
        <StyledMenuItem
          onClick={() => {
            onSelectClick("emp");
          }}
        >
          <ListItemText primary="전사 연봉 분포" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            onSelectClick("dept");
          }}
        >
          <ListItemText primary="부서별 연봉 분포" />
        </StyledMenuItem>

        <StyledMenuItem
          onClick={() => {
            onSelectClick("area");
          }}
        >
          <ListItemText primary="상세 연봉별 부서순위" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default SearchDetailOption;

import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setOption, initOptVal } from "../../../store/actions/searchBar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Svg from "../../../shared/svgIcons";
import useMenuBtn from "../../../hooks/useMenuBtn";
import theme from "../../../shared/theme";

const Container = styled.article`
  position: relative;
  display: grid;
`;

const useStyles = makeStyles({
  menu_container: {
    position: "relative",
    width: "100px",
    height: "30px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "14vw",
    },
  },
  menu_listItemText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const StyledButton = withStyles({
  contained: {
    display: "grid",
    position: "relative",
    width: "100px",
    fontSize: "14px",
    "& .titleText": {
      transform: "translateX(20%)",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "14vw",
      fontSize: "12px",
    },
  },
  startIcon: {
    position: "absolute",
    left: "15%",
  },
})(Button);

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
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const SearchMenu = () => {
  const [menuBtn, setMenuBtn] = useMenuBtn("이름검색");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleMenuClick = (option) => {
    dispatch(initOptVal());
    dispatch(setOption(option));
    setMenuBtn.onMenuItemClick(option);
  };

  return (
    <Container>
      <StyledButton
        aria-controls="customized-menu"
        variant="contained"
        color="primary"
        onClick={setMenuBtn.onClickAnchor}
        startIcon={<Svg name="ArrowDown" component="div" />}
      >
        <span className="titleText">{menuBtn.title}</span>
      </StyledButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={menuBtn.anchorEl}
        keepMounted
        open={Boolean(menuBtn.anchorEl)}
        onClose={setMenuBtn.onClose}
      >
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            handleMenuClick("이름검색");
          }}
        >
          <ListItemText
            className={classes.menu_listItemText}
            primary="이름검색"
          />
        </StyledMenuItem>
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            handleMenuClick("부서검색");
          }}
        >
          <ListItemText
            primary="부서검색"
            className={classes.menu_listItemText}
          />
        </StyledMenuItem>
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            handleMenuClick("직급검색");
          }}
        >
          <ListItemText
            primary="직급검색"
            className={classes.menu_listItemText}
          />
        </StyledMenuItem>
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            handleMenuClick("최근검색");
          }}
        >
          <ListItemText
            primary="최근검색"
            className={classes.menu_listItemText}
          />
        </StyledMenuItem>
      </StyledMenu>
    </Container>
  );
};

export default memo(SearchMenu);

import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOption, setOptVal } from "../../../store/actions/searchBar";
const useStyles = makeStyles(() => ({
  title_container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100px",
    height: "30px",
  },
  title_listItemIcon: {
    position: "absolute",
    left: "0%",
    color: "white",
  },
  title_listItemText: {
    position: "absolute",
    left: "25%",
  },
  menu_container: {
    position: "relative",
    width: "120px",
    height: "30px",
  },
  menu_listItemText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
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
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const SearchMenu = memo((props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = useSelector((state) => state.searchBar.option);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (selected) => {
    dispatch(setOptVal(null));
    dispatch(setOption(selected));
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.title_container}
      >
        <ListItemIcon className={classes.title_listItemIcon}>
          <ArrowDropDownIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText className={classes.title_listItemText} primary={title} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
    </div>
  );
});

export default SearchMenu;

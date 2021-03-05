import React, { useState, memo } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles(() => ({
  title_container: {
    width: "90px",
    height: "35px",
  },
  title_listItemIcon: {
    position: "absolute",
    left: "0%",
    color: "white",
  },
  title_listItemText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  menu_container: {
    position: "relative",
    width: "80px",
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

const SearchCategory = memo((props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { searchCategory, handleCategoryClick } = props;
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <ListItemText
          className={classes.title_listItemText}
          primary={searchCategory ? searchCategory : "통계"}
        />
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
            handleCategoryClick("통계");
            handleClose();
          }}
        >
          <ListItemText className={classes.menu_listItemText} primary="통계" />
        </StyledMenuItem>
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            handleCategoryClick("연봉");
            handleClose();
          }}
        >
          <ListItemText className={classes.menu_listItemText} primary="연봉" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
});

export default SearchCategory;

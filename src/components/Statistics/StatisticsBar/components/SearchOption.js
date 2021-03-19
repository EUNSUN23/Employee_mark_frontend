import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { setDetail } from "../../../../store/actions/statBar";

const useStyles = makeStyles(() => ({
  title_container: {
    minWidth: "70px",
    minHeight: "35px",
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
    fontSize: 13,
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

const SearchOption = memo(() => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(null);
  const classes = useStyles();

  const onDetailClick = (detail) => {
    dispatch(setDetail(detail));
    setTitle(detail);
  };

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
          primary={title ? title : "기준"}
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
            onDetailClick("기준");
            handleClose();
          }}
        >
          <ListItemText className={classes.menu_listItemText} primary="기준" />
        </StyledMenuItem>
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            onDetailClick("조직");
            handleClose();
          }}
        >
          <ListItemText className={classes.menu_listItemText} primary="조직" />
        </StyledMenuItem>
        <StyledMenuItem
          className={classes.menu_container}
          onClick={() => {
            onDetailClick("급여");
            handleClose();
          }}
        >
          <ListItemText className={classes.menu_listItemText} primary="급여" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
});

export default SearchOption;

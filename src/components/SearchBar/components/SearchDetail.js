import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import theme from "../../../theme";

const useStyles = makeStyles(() => ({
  title_container: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
    height: "35px",
  },
  title_listItemIcon: {
    position: "absolute",
    left: "0%",
    color: "white",
    // padding: theme.spacing(0, 1),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title_listItemText: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  menu_container: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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

const SearchDetail = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailTitle, setDetailTitle] = useState(null);
  const { handleOptionClick, category, selected } = props;
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const createSearchDetail = () => {
    if (category) {
      console.log(category);
      console.log(detailTitle);
      const newTitle = category[0];
      if (detailTitle === null || detailTitle !== newTitle) {
        setDetailTitle(newTitle);
        // q. 첫 렌더시에만 전환이 느린 이유?
      }

      const detailList = category.slice(1);
      const searchDetail = detailList.map((item, idx) => {
        return (
          <StyledMenuItem
            key={`category_${item}`}
            className={classes.menu_container}
            onClick={() => {
              handleOptionClick(item);
              handleClose();
            }}
          >
            <ListItemText
              primary={item}
              className={classes.menu_listItemText}
            />
          </StyledMenuItem>
        );
      });

      return searchDetail;
    } else {
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
          <ArrowDropDownIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText
          primary={selected ? selected : detailTitle}
          className={classes.title_listItemText}
        />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {createSearchDetail()}
      </StyledMenu>
    </div>
  );
};

export default SearchDetail;

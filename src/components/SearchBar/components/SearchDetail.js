import React, { useState, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import theme from "../../../theme";
import { KeywordsDispatchContext } from "../context/KeywordsContext";

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
    width: "30ch",
    [theme.breakpoints.only("sm")]: {
      width: "40ch",
    },
    height: "30px",
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "&.menu_disabled": {
      textAlign: "center",
    },
  },
}))(MenuItem);

const SearchDetail = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [clearBtn, setClearBtn] = useState(false);
  const [detailTitle, setDetailTitle] = useState(null);
  const { handleOptionClick, category, selected } = props;
  const classes = useStyles();
  const dispatch = useContext(KeywordsDispatchContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteIcon = (e, identifier) => {
    e.preventDefault();
    dispatch({ type: "delete", identifier: identifier });
  };

  const createDetailList = (arr) => {
    const searchDetail = arr.map((item, idx) => {
      console.log("item value", item.value);
      return (
        <StyledMenuItem
          key={`category_${item.index}`}
          disabled={category.length <= 1 ? true : false}
          className={
            category.length <= 1 ? `${StyledMenuItem.root} menu_disabled` : null
          }
          onClick={() => {
            handleOptionClick({ category: item.category, value: item.value });
            handleClose();
          }}
        >
          <ListItemText primary={item.value} />
          {clearBtn && category.length > 1 ? (
            <DeleteForeverIcon
              size="small"
              onClick={(e) => onDeleteIcon(e, item.index)}
            />
          ) : null}
        </StyledMenuItem>
      );
    });

    return searchDetail;
  };

  const createSearchDetail = () => {
    if (category) {
      const newTitle = category[0];
      let detailList;
      if (detailTitle === null || detailTitle !== newTitle) {
        setDetailTitle(newTitle);
        // q. 첫 렌더시에만 전환이 느린 이유?
      }

      if (newTitle === "recent keyword") {
        detailList =
          category.length > 1
            ? category.slice(1)
            : [{ index: 0, value: "최근 검색내역이 없습니다" }];
        clearBtn === false && setClearBtn(true);
        return createDetailList(detailList);
      }
      detailList = category
        .map((el, idx) => ({ category: category[0], index: idx, value: el }))
        .slice(1);
      clearBtn === true && setClearBtn(false);
      return createDetailList(detailList);
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
          primary={selected ? selected.value : detailTitle}
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

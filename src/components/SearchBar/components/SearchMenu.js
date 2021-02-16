import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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

const SearchMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { selected, handleOptionClick } = props;

  console.log(anchorEl);

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
        style={{
          position: "relative",
          width: "100px",
          height: "30px",
        }}
      >
        <ListItemIcon
          style={{
            position: "absolute",
            left: "0%",
            color: "white",
          }}
        >
          <ArrowDropDownIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={selected}
          style={{
            position: "absolute",
            left: "25%",
          }}
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
          style={{
            position: "relative",
            width: "120px",
            height: "30px",
          }}
          onClick={() => {
            handleOptionClick("이름검색");
            handleClose();
          }}
        >
          <ListItemText
            primary="이름검색"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem
          style={{
            position: "relative",
            width: "120px",
            height: "30px",
          }}
          onClick={() => {
            handleOptionClick("부서검색");
            handleClose();
          }}
        >
          <ListItemText
            primary="부서검색"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem
          style={{
            position: "relative",
            width: "120px",
            height: "30px",
          }}
          onClick={() => {
            handleOptionClick("직급검색");
            handleClose();
          }}
        >
          <ListItemText
            primary="직급검색"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default SearchMenu;

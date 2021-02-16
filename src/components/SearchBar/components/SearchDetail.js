import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Typography from "@material-ui/core/Typography";

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
  console.log("SEARCH DETAIL", category);

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
            key={`category/${item}`}
            style={{
              position: "relative",
              width: "120px",
              height: "30px",
            }}
            onClick={() => {
              handleOptionClick(item);
              handleClose();
            }}
          >
            <ListItemText
              primary={
                <Typography
                  style={{
                    width: "120px",
                    height: "30px",
                    fontSize: 13,
                    lineHeight: "30px",
                    textAlign: "center",
                  }}
                >
                  {item}
                </Typography>
              }
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
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
        style={{
          position: "relative",
          width: "120px",
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
          primary={
            <Typography
              style={{
                position: "absolute",
                fontSize: 10,
                top: "50%",
                left: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {selected ? selected : detailTitle}
            </Typography>
          }
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
        {createSearchDetail()}
      </StyledMenu>
    </div>
  );
};

export default SearchDetail;

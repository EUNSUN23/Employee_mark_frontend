import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import { DefaultMenu, DefaultMenuItem } from "../../../UI/SearchDetailMenu";
import DefaultMenuBtn from "../../../UI/DefaultMenuBtn";
import theme from "../../../../shared/theme";
import { setSelected } from "../../../../store/actions/statBar";

const useStyles = makeStyles({
  menu_container: ({ theme }) => ({
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
  }),
});

const SearchDetailOption = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailTitle, setDetailTitle] = useState(null);
  const classes = useStyles({ theme });

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
      <DefaultMenuBtn
        value={detailTitle}
        initValue="연봉 통계 그래프"
        onClickHandler={handleClick}
      />
      <DefaultMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu_container}
      >
        <DefaultMenuItem
          onClick={() => {
            onSelectClick("emp");
          }}
        >
          <ListItemText primary="전사 연봉 분포" />
        </DefaultMenuItem>
        <DefaultMenuItem
          onClick={() => {
            onSelectClick("dept");
          }}
        >
          <ListItemText primary="부서별 연봉 분포" />
        </DefaultMenuItem>

        <DefaultMenuItem
          onClick={() => {
            onSelectClick("area");
          }}
        >
          <ListItemText primary="상세 연봉별 부서순위" />
        </DefaultMenuItem>
      </DefaultMenu>
    </div>
  );
};

export default SearchDetailOption;

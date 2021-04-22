import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DefaultMenu, DefaultMenuItem } from "../../../UI/SearchDetailMenu";
import DefaultMenuBtn from "../../../UI/DefaultMenuBtn";
import { setSelected } from "../../../../store/actions/statBar";
import useMenuBtn from "../../../../hooks/useMenuBtn";
import ListItemText from "@material-ui/core/ListItemText";

const SearchDetailOption = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useMenuBtn(null);

  const onSelectClick = (type) => {
    if (type === "area") return;

    type === "emp"
      ? setMenu.onMenuItemClick("전사 연봉 분포")
      : setMenu.onMenuItemClick("부서별 연봉 분포");

    dispatch(setSelected({ type: type, salary: "default" }));

    setMenu.onClose();
  };

  return (
    <div>
      <DefaultMenuBtn
        value={menu.title}
        initValue="연봉 통계 그래프"
        onClickHandler={setMenu.onClickAnchor}
      />
      <DefaultMenu
        id="customized-menu"
        anchorEl={menu.anchorEl}
        keepMounted
        open={Boolean(menu.anchorEl)}
        onClose={setMenu.onClose}
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

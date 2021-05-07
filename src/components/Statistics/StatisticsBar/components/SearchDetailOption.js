import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  DetailMenuBtn,
  DefaultMenu,
  DefaultMenuItem,
} from "../../../UI/AppBar/SearchDetailMenu";
import { setSelected } from "../../../../store/actions/statBar";
import useMenuBtn from "../../../../hooks/useMenuBtn";
import { setStatTitle } from "../../../../shared/utility";
import Svg from "../../../../shared/svgIcons";

const SearchDetailOption = () => {
  const dispatch = useDispatch();
  const [menuBtn, setMenuBtn] = useMenuBtn(null);

  const { area, selected } = useSelector(
    (state) => ({
      area: state.statBar.area,
      selected: state.statBar.selected,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!area && !selected) return;
    const initTitle = area ? setStatTitle("area") : setStatTitle(selected.type);
    setMenuBtn.onMenuItemClick(initTitle);
  }, []);

  const onSelectClick = (type) => {
    const newTitle = setStatTitle(type);

    setMenuBtn.onMenuItemClick(newTitle);
    dispatch(setSelected({ type: type, salary: "default" }));
  };

  const title = menuBtn.title || "연봉 통계";

  return (
    <div>
      <DetailMenuBtn
        variant="contained"
        color="primary"
        onClick={setMenuBtn.onClickAnchor}
        startIcon={<Svg name="ArrowDown" size="large" component="div" />}
      >
        {title}
      </DetailMenuBtn>
      <DefaultMenu
        id="customized-menu"
        anchorEl={menuBtn.anchorEl}
        keepMounted
        open={Boolean(menuBtn.anchorEl)}
        onClose={setMenuBtn.onClose}
      >
        <DefaultMenuItem
          onClick={() => {
            onSelectClick("emp");
          }}
        >
          전사 연봉 분포
        </DefaultMenuItem>
        <DefaultMenuItem
          onClick={() => {
            onSelectClick("dept");
          }}
        >
          부서별 연봉 분포
        </DefaultMenuItem>

        <DefaultMenuItem
          onClick={() => {
            onSelectClick("area");
          }}
        >
          상세 연봉별 부서순위
        </DefaultMenuItem>
      </DefaultMenu>
    </div>
  );
};

export default SearchDetailOption;

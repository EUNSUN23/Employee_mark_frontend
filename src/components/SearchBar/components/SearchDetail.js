import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { withStyles } from "@material-ui/core";
import { setOptVal } from "../../../store/actions/searchBar";
import { DetailMenuBtn, DefaultMenu } from "../../UI/AppBar/SearchDetailMenu";
import DetailMenuList from "./DetailMenuList";
import theme from "../../../shared/theme";
import useMenuBtn from "../../../hooks/useMenuBtn";
import {
  createRecentList,
  createOptions,
  setSearchTitle,
} from "../../../shared/utility";
import Svg from "../../../shared/svgIcons";

const StyledMenu = withStyles({
  paper: {
    width: "42vw",
    [theme.breakpoints.up("lg")]: {
      width: "28vw",
    },
  },
})(DefaultMenu);

const Container = styled.section`
  border-radius: ${(props) => props.theme.shape.borderRadius};
  margin-left: ${(props) => props.theme.spacing(3)};
`;

const SearchDetail = () => {
  const [menuBtn, setMenuBtn] = useMenuBtn(null);
  const [category, setCategory] = useState(null);

  const dispatch = useDispatch();

  const { categoryObj, option, keywords } = useSelector(
    (state) => ({
      categoryObj: state.searchBar.category,
      option: state.searchBar.option,
      keywords: state.keywords.keywords,
    }),
    shallowEqual
  );

  const initOption = (option, categoryObj, keywords) => {
    setMenuBtn.onMenuItemClick(null);
    switch (option) {
      case "직급검색":
        setCategory(categoryObj.title);
        return;
      case "부서검색":
        setCategory(categoryObj.dept);
        return;
      case "최근검색":
        setCategory(keywords);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    initOption(option, categoryObj, keywords);
  }, [option, categoryObj, keywords]);

  const handleOptionValue = useCallback(
    (value) => {
      dispatch(setOptVal(value));
      setMenuBtn.onMenuItemClick(value.value);
    },
    [setMenuBtn.onClose, dispatch, setOptVal]
  );

  const createSearchDetail = (category) => {
    if (!category) return null;

    const newTitle = category[0];
    const isRecent = newTitle === "recent keyword";

    const detailList = isRecent
      ? createRecentList(category)
      : createOptions(category);

    return (
      <DetailMenuList
        arr={detailList}
        type={newTitle}
        onClickList={handleOptionValue}
      />
    );
  };

  const title = menuBtn.title || setSearchTitle(option);

  return (
    <Container theme={theme}>
      <DetailMenuBtn
        variant="contained"
        color="primary"
        onClick={setMenuBtn.onClickAnchor}
        startIcon={<Svg name="ArrowDown" size="large" component="div" />}
      >
        {title}
      </DetailMenuBtn>
      <StyledMenu
        id="customized-menu"
        anchorEl={menuBtn.anchorEl}
        keepMounted
        open={Boolean(menuBtn.anchorEl)}
        onClose={setMenuBtn.onClose}
      >
        {createSearchDetail(category)}
      </StyledMenu>
    </Container>
  );
};

export default SearchDetail;

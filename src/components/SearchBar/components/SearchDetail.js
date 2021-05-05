import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { setOptVal } from "../../../store/actions/searchBar";
import { DefaultMenu } from "../../UI/AppBar/SearchDetailMenu";
import DefaultMenuBtn from "../../UI/AppBar/DefaultMenuBtn";
import DetailMenuList from "./DetailMenuList";
import theme from "../../../shared/theme";
import useMenuBtn from "../../../hooks/useMenuBtn";
import { createRecentList, createOptions } from "../../../shared/utility";

const StyledMenuBtn = withStyles({
  root: {
    width: "30vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
  },
  text: {
    width: "35vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
  },
})(DefaultMenuBtn);

const StyledMenu = withStyles({
  paper: {
    [theme.breakpoints.up("sm")]: {
      width: "30vw",
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

  const { categoryObj, option, optionVal, keywords } = useSelector(
    (state) => ({
      categoryObj: state.searchBar.category,
      option: state.searchBar.option,
      optionVal: state.searchBar.optionVal,
      keywords: state.keywords.keywords,
    }),
    shallowEqual
  );

  const initOption = (option, categoryObj, keywords) => {
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
      setMenuBtn.onClose();
      dispatch(setOptVal(value));
    },
    [setMenuBtn.onClose, dispatch, setOptVal]
  );

  const createSearchDetail = (title, category) => {
    if (!category) return null;

    const newTitle = category[0];
    const isRecent = newTitle === "recent keyword";

    if (title === null || title !== newTitle) {
      setMenuBtn.onMenuItemClick(newTitle);
    }

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

  return (
    <Container theme={theme}>
      <StyledMenuBtn
        value={optionVal ? optionVal.value : null}
        initValue={menuBtn.title}
        onClickHandler={setMenuBtn.onClickAnchor}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={menuBtn.anchorEl}
        keepMounted
        open={Boolean(menuBtn.anchorEl)}
        onClose={setMenuBtn.onClose}
      >
        {createSearchDetail(menuBtn.title, category)}
      </StyledMenu>
    </Container>
  );
};

export default SearchDetail;

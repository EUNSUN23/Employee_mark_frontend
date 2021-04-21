import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { setOptVal } from "../../../store/actions/searchBar";
import { deleteKeyword } from "../../../store/actions/keywords";
import ListItemText from "@material-ui/core/ListItemText";
import { DefaultMenu, DefaultMenuItem } from "../../UI/SearchDetailMenu";
import DefaultMenuBtn from "../../UI/DefaultMenuBtn";
import Svg from "../../../shared/svgIcons";
import theme from "../../../shared/theme";

const useStyles = makeStyles(() => ({
  clearBtn: {
    margin: "0 5%",
    transform: "translateX(70%)",
    height: "20px",
    "&:hover": {
      color: "red",
    },
  },
}));

const StyledMenuBtn = withStyles({
  title_container: {
    width: "35vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
  },

  title_listItemText: {
    width: "35vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
  },
})(DefaultMenuBtn);

const StyledMenu = withStyles({
  paper: {
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
    },
  },
})(DefaultMenu);

const StyledMenuItem = withStyles({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
    },
  },
})(DefaultMenuItem);

const SearchDetail = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [clearBtn, setClearBtn] = useState(false);
  const [optTitle, setOptTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const classes = useStyles();
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickDel = (e, identifier) => {
    e.preventDefault();
    dispatch(deleteKeyword(identifier));
  };

  const handleOptionValue = (value) => {
    handleClose();
    dispatch(setOptVal(value));
  };

  const createDetailList = (arr, arrType) => {
    let resultList;
    if (arrType === "recent keyword") {
      const sortedArr = arr.sort((a, b) => {
        return b.index - a.index;
      });

      const valueArr = sortedArr.map((el, idx) => {
        return el.value;
      });

      const reducedArr = valueArr.reduce((accumulator, current) => {
        const length = accumulator.length;
        if (length === 0 || accumulator.indexOf(current) <= -1) {
          current && accumulator.push(current);
        }
        return accumulator;
      }, []);

      resultList = reducedArr.slice(0, 5).map((el, idx) => {
        const index = valueArr.indexOf(el);
        return {
          category: arr[index].category,
          value: el,
          index: arr[index].index,
        };
      });
    } else {
      resultList = arr;
    }

    return resultList.map((item, idx) => {
      console.log("value", item.value);
      return (
        <StyledMenuItem
          key={`category_${item.index}`}
          disabled={category.length <= 1 ? true : false}
          className={
            category.length <= 1 ? `${StyledMenuItem.root} menu_disabled` : null
          }
        >
          <ListItemText
            primary={item.value}
            onClick={() => {
              handleOptionValue({ category: item.category, value: item.value });
            }}
          />
          {clearBtn && category.length > 1 ? (
            <div
              className={classes.clearBtn}
              onClick={(e) => onClickDel(e, item.index)}
            >
              <Svg name="Delete" size="small" />
            </div>
          ) : null}
        </StyledMenuItem>
      );
    });
  };

  const createSearchDetail = (optTitle, category) => {
    if (category) {
      const newTitle = category[0];
      let detailList;
      if (optTitle === null || optTitle !== newTitle) {
        setOptTitle(newTitle);
      }

      if (newTitle === "recent keyword") {
        detailList =
          category.length > 1
            ? category.slice(1)
            : [{ index: 0, value: "최근 검색내역이 없습니다" }];
        clearBtn === false && setClearBtn(true);
        return createDetailList(detailList, newTitle);
      } else {
        detailList = category
          .map((el, idx) => ({ category: category[0], index: idx, value: el }))
          .slice(1);
        clearBtn === true && setClearBtn(false);
      }

      return createDetailList(detailList, newTitle);
    } else {
      return;
    }
  };

  return (
    <div>
      <StyledMenuBtn
        value={optionVal ? optionVal.value : null}
        initValue={optTitle}
        onClickHandler={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {createSearchDetail(optTitle, category)}
      </StyledMenu>
    </div>
  );
};

export default SearchDetail;

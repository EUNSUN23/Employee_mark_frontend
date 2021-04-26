import React, { useEffect, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchMenu from "./components/SearchMenu";
import SearchInput from "./components/SearchInput";
import { Grid } from "@material-ui/core";
import { initKeywords, addKeywords } from "../../store/actions/keywords";
import { getEmpData } from "../../store/actions/searchEmp";
import { isValid } from "../../shared/utility";
import theme from "../../shared/theme";
import DefaultAppBar from "../UI/AppBar/DefaultAppBar";
import SubmitBtn from "../UI/AppBar/SubmitBtn";

const useStyles = makeStyles({
  searchContainer: {
    position: "relative",
    marginLeft: "8%",
    width: "70vw",
    height: "14vh",
    [theme.breakpoints.up("md")]: {
      width: "50vw",
    },
    [theme.breakpoints.only("sm")]: {
      width: "70vw",
    },
  },
  search_input: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: theme.spacing(3),
    width: "85%",
  },
  search_select: {
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(3),
  },
  searchInput: {
    "&:hover": {
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "50%",
    position: "absolute",
    pointerEvents: "none",
    top: "15%",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20vw",
    },
  },
  searchOption: {
    position: "relative",
  },
});

const SearchBar = () => {
  const classes = useStyles({ theme });
  const dispatch = useDispatch();

  const { keywords, page, option, inputVal, optionVal } = useSelector(
    (state) => ({
      keywords: state.keywords.keywords,
      page: state.searchEmp.page,
      option: state.searchBar.option,
      inputVal: state.searchBar.inputVal,
      optionVal: state.searchBar.optionVal,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (keywords.length === 1) dispatch(initKeywords());
  }, []);

  const submitData = useCallback(() => {
    const dataObj =
      option === "이름검색" ? { category: "name", value: inputVal } : optionVal;
    isValid(dataObj.value);
    dispatch(getEmpData(dataObj, page, "noPage"));
    dispatch(addKeywords(dataObj.category, dataObj.value));
  }, [
    option,
    optionVal,
    inputVal,
    isValid,
    dispatch,
    page,
    getEmpData,
    addKeywords,
  ]);

  return (
    <DefaultAppBar type="board">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitData();
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          className={classes.searchContainer}
          spacing={1}
        >
          <Grid item xs={2} className={classes.searchOption}>
            <SearchMenu />
          </Grid>
          <Grid item xs={7} className={classes.searchInputContainer}>
            <SearchInput classes={classes} />
          </Grid>
          <Grid item xs={2}>
            <SubmitBtn onSubmitHandler={submitData}>검색</SubmitBtn>
          </Grid>
        </Grid>
      </form>
    </DefaultAppBar>
  );
};

export default SearchBar;

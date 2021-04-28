import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../shared/theme";
import { getStatAPI } from "../../../store/actions/statPage";
import DefaultAppBar from "../../UI/AppBar/DefaultAppBar";
import SearchInput from "./components/SearchInput";
import SubmitBtn from "../../UI/AppBar/SubmitBtn";

const useStyles = makeStyles({
  searchContainer: ({ theme }) => ({
    position: "relative",
    width: "100vw",
    height: "14vh",
    [theme.breakpoints.up("sm")]: {
      width: "50vw",
    },
  }),

  submit: ({ selected, theme }) => ({
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      left: `${selected && selected.type === "area" ? "45vw" : "52vw"}`,
      top: "50%",
      transform: "translateY(-50%)",
    },
  }),
});

const StatisticsBar = () => {
  const dispatch = useDispatch();

  const { area, selected, isDeptSent, isEmpSent } = useSelector(
    (state) => ({
      selected: state.statBar.selected,
      area: state.statBar.area,
      isDeptSent: state.statBar.isDeptSent,
      isEmpSent: state.statBar.isEmpSent,
    }),
    shallowEqual
  );

  const classes = useStyles({ selected: selected, theme: theme });

  const getBarData = (isSent) => {
    if (isSent) return;
    return dispatch(getStatAPI(selected));
  };

  const onSubmitHandler = useCallback(() => {
    if (!selected) return window.alert("검색어를 입력하세요");
    switch (selected.type) {
      case "emp":
        return getBarData(isEmpSent);
      case "dept":
        return getBarData(isDeptSent);
      case "area":
        return dispatch(getStatAPI(area));
      default:
        return window.alert("검색어를 입력하세요");
    }
  }, [selected, getBarData, dispatch]);

  return (
    <DefaultAppBar type="statistics">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={1}
          className={classes.searchContainer}
        >
          <Grid item xs={7} md={7} lg={7}>
            <SearchInput classes={classes} />
          </Grid>
          <Grid item xs={1} sm={1} className={classes.submit}>
            <SubmitBtn onSubmitHandler={onSubmitHandler}>검색</SubmitBtn>
          </Grid>
        </Grid>
      </form>
    </DefaultAppBar>
  );
};

export default StatisticsBar;

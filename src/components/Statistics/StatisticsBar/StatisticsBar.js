import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../shared/theme";
import { getStatAPI } from "../../../store/actions/statPage";
import DefaultAppBar from "../../UI/AppBar/DefaultAppBar";
import SearchInput from "./components/SearchInput";

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "row",
  },
  menuButton: ({ theme }) => ({
    marginRight: theme.spacing(2),
  }),
  searchContainer: ({ theme }) => ({
    position: "relative",
    width: "100vw",
    height: "14vh",
    [theme.breakpoints.up("sm")]: {
      width: "48vw",
    },
  }),

  submit: ({ selected, theme }) => ({
    color: "white",
    fontSize: "1.3vw",
    minWidth: "6vw",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: `${selected && selected.type === "area" ? "45vw" : "60vw"}`,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.3vw",
      minWidth: "4vw",
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

  const onSubmitHandler = (e, selected, area, isDeptSent, isEmpSent) => {
    e.preventDefault();

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
  };

  return (
    <DefaultAppBar type="statistics">
      <form
        onSubmit={(e) => {
          onSubmitHandler(e, selected, area, isDeptSent, isEmpSent);
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={1}
          className={classes.searchContainer}
          selected={selected}
        >
          <Grid item xs={8} sm={2} md={7}>
            <SearchInput classes={classes} />
          </Grid>
          <Grid item xs={1} selected={selected}>
            <Button
              selected={selected}
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={(e) =>
                onSubmitHandler(e, selected, area, isDeptSent, isEmpSent)
              }
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </form>
    </DefaultAppBar>
  );
};

export default StatisticsBar;

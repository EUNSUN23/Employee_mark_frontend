import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { initError } from "../../store/actions/statPage";
import { Grid } from "@material-ui/core";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import StatisticsBar from "./StatisticsBar/StatisticsBar";
import SalaryStack from "./StatisticsPage/SalaryStack";
import SalaryDist from "./StatisticsPage/SalaryDist";
import BoardLoader from "../UI/BoardLoader";

const Statistics = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, openErrorMs, errorMs } = useSelector(
    (state) => ({
      isLoading: state.statPage.loading,
      openErrorMs: state.statPage.errorMs !== null,
      errorMs: state.statPage.errorMs,
    }),
    shallowEqual
  );

  const optionDetail = useSelector((state) => state.statBar.optionDetail);
  const handleCloseMs = () => {
    dispatch(initError());
  };

  const chart = optionDetail === "조직" ? <SalaryStack /> : <SalaryDist />;

  const statistics = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={6}>
      <Modal open={openErrorMs} message={errorMs} handleClose={handleCloseMs} />
      <Grid item></Grid>
      <Grid item></Grid>
      <Grid item>{chart}</Grid>
    </Grid>
  );

  return (
    <>
      <StatisticsBar />
      {statistics}
    </>
  );
};

export default Statistics;

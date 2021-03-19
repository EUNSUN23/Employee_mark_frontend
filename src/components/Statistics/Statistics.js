import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initError } from "../../store/actions/statPage";
import { Grid } from "@material-ui/core";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import StatisticsBar from "./StatisticsBar/StatisticsBar";
import SalaryStack from "./StatisticsPage/SalaryStack";
import SalaryDist from "./StatisticsPage/SalaryDist";

const Statistics = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.statPage.loading);
  const openErrorMs = useSelector((state) => state.statPage.errorMs !== null);
  const errorMs = useSelector((state) => state.statPage.errorMs);

  const optionDetail = useSelector((state) => state.statBar.optionDetail);
  const handleCloseMs = () => {
    dispatch(initError());
  };

  const statisticsPage = () => {
    switch (optionDetail) {
      case "조직":
        return <SalaryStack />;
      case "급여":
        return <SalaryDist />;
      default:
        return null;
    }
  };

  const statistics = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={6}>
      <Modal open={openErrorMs} message={errorMs} handleClose={handleCloseMs} />
      <Grid item></Grid>
      <Grid item></Grid>
      <Grid item>{statisticsPage()}</Grid>
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

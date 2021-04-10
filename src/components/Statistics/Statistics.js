import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { initError } from "../../store/actions/statPage";
import { Grid } from "@material-ui/core";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import StatisticsBar from "./StatisticsBar/StatisticsBar";
import EmpPie from "./Graph/SalaryStackChart/EmpPie";
import DeptChart from "./Graph/SalaryStackChart/DeptChart";
import DistBar from "./Graph/SalaryDist/DistBar";
import StatBackground from "./StatBackground";

const Statistics = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    openErrorMs,
    errorMs,
    selected,
    deptData,
    empData,
    area,
    aboveData,
    belowData,
  } = useSelector(
    (state) => ({
      isLoading: state.statPage.loading,
      openErrorMs: state.statPage.errorMs !== null,
      errorMs: state.statPage.errorMs,
      selected: state.statBar.selected,
      deptData: state.statPage.deptData,
      empData: state.statPage.empData,
      aboveData: state.statPage.aboveData,
      belowData: state.statPage.belowData,
      area: state.statBar.area,
    }),
    shallowEqual
  );

  const handleCloseMs = () => {
    dispatch(initError());
  };

  const makeGraph = (
    selected,
    deptData,
    empData,
    area,
    aboveData,
    belowData
  ) => {
    switch (selected) {
      case "전사 연봉 분포":
        return empData ? (
          <Grid container>
            <Grid item xs={false} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              <EmpPie empData={empData} />{" "}
            </Grid>
            <Grid item xs={false} sm={1}></Grid>
          </Grid>
        ) : null;
      case "부서별 연봉 분포":
        return deptData ? (
          <Grid container>
            <Grid item xs={12} sm={10}>
              <DeptChart deptData={deptData} />
            </Grid>
          </Grid>
        ) : null;
      case "상세 연봉별 부서순위":
        if (!area) return null;
        const data = area.type === "below" ? belowData : aboveData;
        return (
          <Grid container>
            <Grid item xs={false} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              <DistBar data={data} type={area.type} salary={area.salary} />
            </Grid>
            <Grid item xs={false} sm={1}></Grid>
          </Grid>
        );
      default:
        return <StatBackground />;
    }
  };

  const statistics = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={6}>
      <Modal open={openErrorMs} message={errorMs} handleClose={handleCloseMs} />
      <Grid item></Grid>
      <Grid item></Grid>
      {makeGraph(selected, deptData, empData, area, aboveData, belowData)}
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

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { initError } from "../../store/actions/statPage";
import { Grid } from "@material-ui/core";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import StatisticsBar from "./StatisticsBar/StatisticsBar";
import StatisticsPage from "./StatisticsPage/StatisticsPage";

const Statistics = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.statPage.loading);
  const openErrorMs = useSelector((state) => state.statPage.errorMs !== null);
  const errorMs = useSelector((state) => state.statPage.errorMs);
  const handleCloseMs = () => {
    dispatch(initError());
  };

  //   /api/stat/distribution/above/:salary	get	특정 급여 이상의 부서별 인원 분포
  // /api/stat/distribution/below/:salary	get	특정 급여 이하의 부서별 인원 분포
  // /api/stat/distribution/dept/salary	get	각 부서내 10000간격의 급여별 인원 분포
  // -> 7개 부서 그래프 stack차트
  // /api/stat/distribution/emp/salary	get	10000간격의 급여별 전 직원 인원 분포
  // -> 전체 그래프 stack차트

  // 탭 : 연봉통계자료 > 조직별 통계> 전체/부서
  //                    급여별 통계> track

  // <----- 리덕스 리팩토링 ----->
  // 1. statistics 페이지, statistics Bar
  // 2. statistics 페이지 - <리듀서> 1) 데이터 연봉>전체/부서 (2), 연봉>BELOW/ABOVE (2)
  //                                2) loading여부
  //                                3) 에러메세지
  //
  //                        <액션>  getStatAPI (MIDDLEWARE) >>>> fetchStart(로딩 true), setData(로딩false), fetchFail(로딩false, 에러메세지), initError(모달클릭시)
  // 3. statistics Bar  - <리듀서> 1) option(통계종류), optionDetail(기준), optionInput(select형), trackInput(track형)
  //                                --> Salary > SalaryStack/SalaryDist (optionDetail에 따라 결정) > 데이터출력
  //                      <액션>    setOption, setOptionDetail, setOptionInput, setTrackInput
  // 고민 - getState ?...

  const statistics = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={10}>
      <Modal open={openErrorMs} message={errorMs} handleClose={handleCloseMs} />
      <Grid item></Grid>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <StatisticsPage />
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
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

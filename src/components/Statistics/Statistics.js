import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useDialog from "../../hooks/useDialog";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import StatisticsBar from "./StatisticsBar/StatisticsBar";
import StatisticsPage from "./StatisticsPage";

const Statistics = () => {
  const [dialog, openDialog, closeDialog] = useDialog(false);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);

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
  const getStatisticsData = async (dataType) => {
    let res;
    try {
      setIsLoading(true);
      let url;
      if (dataType.type === "emp") {
        url = `http://localhost:3008/api/stat/distribution/emp/salary`;
      } else if (dataType.type === "dept") {
        url = `http://localhost:3008/api/stat/distribution/dept/salary`;
      } else if (dataType.type === "below") {
        url = `http://localhost:3008/api/stat/distribution/below/${dataType.salary}`;
      } else if (dataType.type === "above") {
        url = `http://localhost:3008/api/stat/distribution/above/${dataType.salary}`;
      }

      console.log("URL", url);
      res = await axios.get(url);
      const result = res.data.packet;
      console.log("RESULT", result);
      if (result === null) {
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        setData(result);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("catch error", err.response.status);
      openDialog(err.response.status);
    }
  };

  const onSearchHandler = useCallback((dataType) => {
    // dataType = {type:"emp","dept","below","above" salary:"default", number }
    if (dataType.type) {
      console.log("DATA_TYPE", dataType);
      getStatisticsData(dataType);
    } else {
      window.alert("검색어를 입력하세요");
    }
  }, []);

  const statistics = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={10}>
      <Modal
        open={dialog.open}
        message={dialog.message}
        handleClose={closeDialog}
      />
      <Grid item></Grid>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <StatisticsPage data={data} />
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </Grid>
  );

  return (
    <>
      <StatisticsBar onSubmitHandler={onSearchHandler} />
      {statistics}
    </>
  );
};

export default Statistics;

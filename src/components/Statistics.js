import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useDialog from "../hooks/useDialog";
import Modal from "./UI/Modal";
import Loader from "./UI/Loader";
import StatisticsBar from "../StatisticsBar";

const Statistics = (props) => {
  const [dialog, openDialog, closeDialog] = useDialog(false);
  const [isLoading, setIsLoading] = useState(null);
  const { location, initPage, isInitialized } = props;

  //   /api/stat/distribution/above/:salary	get	특정 급여 이상의 부서별 인원 분포
  // /api/stat/distribution/below/:salary	get	특정 급여 이하의 부서별 인원 분포
  // /api/stat/distribution/dept/salary	get	각 부서내 10000간격의 급여별 인원 분포
  // -> 파이형 or 도넛형 그래프 7개
  // /api/stat/distribution/emp/salary	get	10000간격의 급여별 전 직원 인원 분포
  // -> 파이형 or 도넛형 그래프 1개 큰것

  // 탭 : 연봉통계자료 > 조직별 통계> 전체/부서
  //                    급여별 통계> track

  useEffect(() => {
    initPage();
  }, [location, initPage, isInitialized]);

  const getEmployeeData = async (data, page, isIntersected) => {
    let res;
    //데이터 받아오기
    const setLoader = (bool) => {
      isIntersected === "intersected"
        ? setIsNextLoading(bool)
        : setIsLoading(bool);
    };
    try {
      setLoader(true);
      let url;
      const page_no = isIntersected === "intersected" ? page.page + 1 : page;
      url =
        data.category === "name"
          ? `http://localhost:3008/api/emp/${data.value}/${page_no}`
          : `http://localhost:3008/api/emp/${data.category}/${data.value}/${page_no}`;
      console.log(url);
      res = await axios.get(url);
      if (res.data.packet === null) {
        setLoader(false);
        return;
      } else {
        setLoader(false);
        isIntersected === "intersected" ? setPage() : initBoard();
        const employeeList = res.data.packet;
        return setEmployeeData((prevData) => {
          let updatedData;
          if (prevData) {
            const lastId = prevData[prevData.length - 1].id;
            const newData = employeeList.map((el, idx) => ({
              employee: el,
              id: lastId + idx + 1,
            }));
            updatedData = prevData.concat(newData);
          } else {
            updatedData = employeeList.map((el, idx) => ({
              employee: el,
              id: idx,
            }));
            console.log("UPDATED_DATA", updatedData);
          }

          return setEmployeeData(updatedData);
        });
      }
    } catch (err) {
      setLoader(false);
      console.log("catch error", err.response.status);
      openDialog(err.response.status);
    }
  };

  const onSearchHandler = useCallback((dataType) => {
    // dataType = {type:"emp","dept","below","above" salary:"default", number }
    if (dataType) {
      getStatisticsData(dataType);
    } else {
      window.alert("검색어를 입력하세요");
    }
  }, []);
  return (
    <>
      <StatisticsBar onSubmitHandler={onSearchHandler} />
      <StatisticsPage data={data} />
    </>
  );
};

export default Statistics;

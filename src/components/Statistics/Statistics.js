import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import useDialog from "../../hooks/useDialog";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import StatisticsBar from "./StatisticsBar/StatisticsBar";
import StatisticsPage from "./StatisticsPage";

const Statistics = (props) => {
  const [dialog, openDialog, closeDialog] = useDialog(false);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const { location, initSearchBar, isInitialized } = props;

  //   /api/stat/distribution/above/:salary	get	특정 급여 이상의 부서별 인원 분포
  // /api/stat/distribution/below/:salary	get	특정 급여 이하의 부서별 인원 분포
  // /api/stat/distribution/dept/salary	get	각 부서내 10000간격의 급여별 인원 분포
  // -> 파이형 or 도넛형 그래프 7개
  // /api/stat/distribution/emp/salary	get	10000간격의 급여별 전 직원 인원 분포
  // -> 파이형 or 도넛형 그래프 1개 큰것

  // 탭 : 연봉통계자료 > 조직별 통계> 전체/부서
  //                    급여별 통계> track

  useEffect(() => {
    initSearchBar();
  }, [location, initSearchBar, isInitialized]);

  const getStatisticsData = async (dataType) => {
    let res;
    try {
      setIsLoading(true);
      let url;
      switch (dataType.type) {
        case "emp":
          url = `http://localhost:3008/api/stat/distribution/emp/salary`;
        // 10000간격의 급여별 전 직원 인원 분포 (40000~160000)
        // const res = {
        //   packet: [
        //     { sal: 160000, cnt: 15 },
        //     { sal: 150000, cnt: 81 },
        //     { sal: 140000, cnt: 441 },
        //     { sal: 130000, cnt: 1746 },
        //     { sal: 120000, cnt: 5066 },
        //     { sal: 110000, cnt: 11628 },
        //     { sal: 100000, cnt: 22318 },
        //     { sal: 90000, cnt: 37129 },
        //     { sal: 80000, cnt: 57028 },
        //     { sal: 70000, cnt: 67842 },
        //     { sal: 60000, cnt: 58888 },
        //     { sal: 50000, cnt: 34722 },
        //     { sal: 40000, cnt: 3120 },
        //   ],
        // };
        case "dept":
          url = `http://localhost:3008/api/stat/distribution/dept/salary`;
        //각 부서내 10000간격의 급여별 인원 분포  (40000~최소 140000, 최대160000)
        // const res = {
        //   packet: [
        //     { dept_name: "Customer Service", sal: 150000, cnt: 5 },
        //     { dept_name: "Customer Service", sal: 140000, cnt: 27 },
        //     { dept_name: "Customer Service", sal: 130000, cnt: 76 },
        //     { dept_name: "Customer Service", sal: 120000, cnt: 200 },
        //     { dept_name: "Customer Service", sal: 110000, cnt: 520 },
        //     { dept_name: "Customer Service", sal: 100000, cnt: 971 },
        //     { dept_name: "Customer Service", sal: 90000, cnt: 1830 },
        //     { dept_name: "Customer Service", sal: 80000, cnt: 3693 },
        //     { dept_name: "Customer Service", sal: 70000, cnt: 5309 },
        //     { dept_name: "Customer Service", sal: 60000, cnt: 5228 },
        //     { dept_name: "Customer Service", sal: 50000, cnt: 3602 },
        //     { dept_name: "Customer Service", sal: 40000, cnt: 352 },
        //     { dept_name: "Development", sal: 150000, cnt: 2 },
        //     { dept_name: "Development", sal: 140000, cnt: 6 },
        //     { dept_name: "Development", sal: 130000, cnt: 51 },
        //     { dept_name: "Development", sal: 120000, cnt: 276 },
        //     { dept_name: "Development", sal: 110000, cnt: 1077 },
        //     { dept_name: "Development", sal: 100000, cnt: 3358 },
        //     { dept_name: "Development", sal: 90000, cnt: 7789 },
        //     { dept_name: "Development", sal: 80000, cnt: 14887 },
        //     { dept_name: "Development", sal: 70000, cnt: 19699 },
        //     { dept_name: "Development", sal: 60000, cnt: 18192 },
        //     { dept_name: "Development", sal: 50000, cnt: 10676 },
        //     { dept_name: "Development", sal: 40000, cnt: 945 },
        //     { dept_name: "Finance", sal: 150000, cnt: 2 },
        //     { dept_name: "Finance", sal: 140000, cnt: 18 },
        //     { dept_name: "Finance", sal: 130000, cnt: 122 },
        //     { dept_name: "Finance", sal: 120000, cnt: 377 },
        //     { dept_name: "Finance", sal: 110000, cnt: 1000 },
        //     { dept_name: "Finance", sal: 100000, cnt: 1909 },
        //     { dept_name: "Finance", sal: 90000, cnt: 2933 },
        //     { dept_name: "Finance", sal: 80000, cnt: 3374 },
        //     { dept_name: "Finance", sal: 70000, cnt: 2941 },
        //     { dept_name: "Finance", sal: 60000, cnt: 2021 },
        //     { dept_name: "Finance", sal: 50000, cnt: 817 },
        //     { dept_name: "Finance", sal: 40000, cnt: 65 },
        //     { dept_name: "Human Resources", sal: 150000, cnt: 1 },
        //     { dept_name: "Human Resources", sal: 130000, cnt: 6 },
        //     { dept_name: "Human Resources", sal: 120000, cnt: 32 },
        //     { dept_name: "Human Resources", sal: 110000, cnt: 115 },
        //     { dept_name: "Human Resources", sal: 100000, cnt: 342 },
        //     { dept_name: "Human Resources", sal: 90000, cnt: 962 },
        //     { dept_name: "Human Resources", sal: 80000, cnt: 2655 },
        //     { dept_name: "Human Resources", sal: 70000, cnt: 4169 },
        //     { dept_name: "Human Resources", sal: 60000, cnt: 4462 },
        //     { dept_name: "Human Resources", sal: 50000, cnt: 2988 },
        //     { dept_name: "Human Resources", sal: 40000, cnt: 339 },
        //     { dept_name: "Marketing", sal: 150000, cnt: 7 },
        //     { dept_name: "Marketing", sal: 140000, cnt: 29 },
        //     { dept_name: "Marketing", sal: 130000, cnt: 172 },
        //     { dept_name: "Marketing", sal: 120000, cnt: 591 },
        //     { dept_name: "Marketing", sal: 110000, cnt: 1347 },
        //     { dept_name: "Marketing", sal: 100000, cnt: 2551 },
        //     { dept_name: "Marketing", sal: 90000, cnt: 3378 },
        //     { dept_name: "Marketing", sal: 80000, cnt: 3977 },
        //     { dept_name: "Marketing", sal: 70000, cnt: 3360 },
        //     { dept_name: "Marketing", sal: 60000, cnt: 2075 },
        //     { dept_name: "Marketing", sal: 50000, cnt: 871 },
        //     { dept_name: "Marketing", sal: 40000, cnt: 68 },
        //     { dept_name: "Production", sal: 140000, cnt: 6 },
        //     { dept_name: "Production", sal: 130000, cnt: 33 },
        //     { dept_name: "Production", sal: 120000, cnt: 233 },
        //     { dept_name: "Production", sal: 110000, cnt: 999 },
        //     { dept_name: "Production", sal: 100000, cnt: 2944 },
        //     { dept_name: "Production", sal: 90000, cnt: 6901 },
        //     { dept_name: "Production", sal: 80000, cnt: 12940 },
        //     { dept_name: "Production", sal: 70000, cnt: 17105 },
        //     { dept_name: "Production", sal: 60000, cnt: 15516 },
        //     { dept_name: "Production", sal: 50000, cnt: 9202 },
        //     { dept_name: "Production", sal: 40000, cnt: 796 },
        //     { dept_name: "Quality Management", sal: 140000, cnt: 1 },
        //     { dept_name: "Quality Management", sal: 130000, cnt: 4 },
        //     { dept_name: "Quality Management", sal: 120000, cnt: 33 },
        //     { dept_name: "Quality Management", sal: 110000, cnt: 152 },
        //     { dept_name: "Quality Management", sal: 100000, cnt: 565 },
        //     { dept_name: "Quality Management", sal: 90000, cnt: 1435 },
        //     { dept_name: "Quality Management", sal: 80000, cnt: 3256 },
        //     { dept_name: "Quality Management", sal: 70000, cnt: 4857 },
        //     { dept_name: "Quality Management", sal: 60000, cnt: 4623 },
        //     { dept_name: "Quality Management", sal: 50000, cnt: 3071 },
        //     { dept_name: "Quality Management", sal: 40000, cnt: 298 },
        //     { dept_name: "Research", sal: 140000, cnt: 1 },
        //     { dept_name: "Research", sal: 130000, cnt: 18 },
        //     { dept_name: "Research", sal: 120000, cnt: 84 },
        //     { dept_name: "Research", sal: 110000, cnt: 284 },
        //     { dept_name: "Research", sal: 100000, cnt: 874 },
        //     { dept_name: "Research", sal: 90000, cnt: 1929 },
        //     { dept_name: "Research", sal: 80000, cnt: 3774 },
        //     { dept_name: "Research", sal: 70000, cnt: 5013 },
        //     { dept_name: "Research", sal: 60000, cnt: 4360 },
        //     { dept_name: "Research", sal: 50000, cnt: 2730 },
        //     { dept_name: "Research", sal: 40000, cnt: 218 },
        //     { dept_name: "Sales", sal: 160000, cnt: 15 },
        //     { dept_name: "Sales", sal: 150000, cnt: 64 },
        //     { dept_name: "Sales", sal: 140000, cnt: 353 },
        //     { dept_name: "Sales", sal: 130000, cnt: 1264 },
        //     { dept_name: "Sales", sal: 120000, cnt: 3240 },
        //     { dept_name: "Sales", sal: 110000, cnt: 6134 },
        //     { dept_name: "Sales", sal: 100000, cnt: 8804 },
        //     { dept_name: "Sales", sal: 90000, cnt: 9972 },
        //     { dept_name: "Sales", sal: 80000, cnt: 8472 },
        //     { dept_name: "Sales", sal: 70000, cnt: 5389 },
        //     { dept_name: "Sales", sal: 60000, cnt: 2411 },
        //     { dept_name: "Sales", sal: 50000, cnt: 765 },
        //     { dept_name: "Sales", sal: 40000, cnt: 39 },
        //   ],
        // };
        case "below":
          url = `http://localhost:3008/api/stat/distribution/below/${dataType.salary}`;
        case "above":
          url = `http://localhost:3008/api/stat/distribution/above/${dataType.salary}`;
        default:
          break;
      }
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
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <StatisticsPage data={data} />
        </Grid>
        <Grid item xs={false} sm={2} />
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

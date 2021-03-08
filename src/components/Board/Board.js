import React, { useEffect, useState, useCallback, useRef } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import ScrollToTop from "../UI/ScrollToTop";
import axios from "axios";
import usePage from "../../hooks/usePage";
import useDialog from "../../hooks/useDialog";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import { KeywordsProvider } from "../SearchBar/context/KeywordsContext";

const Board = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [scrollToTop, setScrollToTop] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [dialog, openDialog, closeDialog] = useDialog(false);
  const [page, setPage, initPage] = usePage(1);
  const viewport = useRef(null);
  //기본 직원정보 : 이름, 부서, 직급, 퇴사여부

  const initBoard = useCallback(() => {
    setEmployeeData(null);
    initPage();
  }, []);

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

          return updatedData;
        });
      }
    } catch (err) {
      setLoader(false);
      console.log("catch error", err.response.status);
      openDialog(err.response.status);
    }
  };

  const handleScroll = (e) => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    scrollTop < 200 && scrollTop >= 0
      ? setScrollToTop(false)
      : setScrollToTop(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollToTop]);

  const onSearchHandler = useCallback((data) => {
    if (data.value) {
      localStorage.setItem("CURRENT_KEY", JSON.stringify(data));
      getEmployeeData(data, page.defaultPage, "unIntersected");
    } else {
      window.alert("검색어를 입력하세요");
    }
  }, []);

  const handleOnScrollBtn = useCallback(() => {
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const board = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={10}>
      <Modal
        open={dialog.open}
        message={dialog.message}
        handleClose={closeDialog}
      />

      <Grid item></Grid>
      <Grid item container ref={viewport}>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <CardContainer
            employeeData={employeeData}
            page={page}
            getEmployeeData={getEmployeeData}
            isNextLoading={isNextLoading}
          />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      <ScrollToTop
        onScroll={(e) => handleScroll(e)}
        show={scrollToTop}
        handleOnScrollBtn={handleOnScrollBtn}
      />
    </Grid>
  );

  return (
    <>
      <KeywordsProvider>
        <SearchBar onSubmitHandler={onSearchHandler} />
      </KeywordsProvider>
      {board}
    </>
  );
};

export default Board;

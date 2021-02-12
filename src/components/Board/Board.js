import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import EmployeeCard from "./EmployeeCard/EmployeeCard";
import ScrollToTop from "../ScrollToTop";
import axios from "axios";
import usePage from "../../hooks/usePage";
import useDialog from "../../hooks/useDialog";
import Modal from "../UI/Modal";

const Board = (props) => {
  const [employeeCards, setEmployeeCards] = useState(null);
  const [scrollToTop, setScrollToTop] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [dialog, openDialog, closeDialog] = useDialog(false);
  const [page, setPage] = usePage(1);

  const { location, initPage } = props;

  //기본 직원정보 : 이름, 부서, 직급, 퇴사여부

  const getEmployeeData = async (data, page) => {
    let res;
    const createEmployeeList = (employeeData) => {
      return employeeData.map((employee, idx) => {
        return (
          <Grid key={"employee" + idx} item xs={12}>
            <EmployeeCard {...employee} />
          </Grid>
        );
      });
    };
    try {
      res = await axios.get(`/${data.category}/
      ${data.value}/${page}`);
      if (res.data) {
        setPage(page + 1);
        setEmployeeCards(createEmployeeList(res.data));
      }
    } catch (err) {
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
    if (scrollToTop === null) {
      initPage();
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollToTop]);

  const onSearchHandler = useCallback((data) => {
    console.log(data);
    if (data.value) {
      setIsLoading(true);
      getEmployeeData(data, page.initPage);
      setIsLoading(false);
    } else {
      window.alert("검색어를 입력하세요");
    }
  }, []);

  const handleOnScrollBtn = useCallback(() => {
    console.log("scroll to top");
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SearchBar location={location} onSubmitHandler={onSearchHandler} />

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
            <CardContainer employeeCards={employeeCards} />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
        <ScrollToTop
          onScroll={(e) => handleScroll(e)}
          show={scrollToTop}
          handleOnScrollBtn={handleOnScrollBtn}
        />
      </Grid>
    </>
  );
};

export default Board;

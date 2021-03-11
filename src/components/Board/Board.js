import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import ScrollToTop from "../UI/ScrollToTop";
import useDialog from "../../hooks/useDialog";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";

const Board = () => {
  const [scrollToTop, setScrollToTop] = useState(null);
  const [dialog, openDialog, closeDialog] = useDialog(false);
  const viewport = useRef(null);

  const dispatch = useDispatch();

  // employeeData: null,
  // searchCategory: null,
  // loading: false,
  // nextLoading: false,
  // errorMs: null,
  // page: 1,
  const employeeData = useSelector((state) => state.searchEMP.employeeData);

  const isLoading = useSelector((state) => state.searchEMP.loading);

  const isNextLoading = useSelector((state) => state.searchEMP.nextLoading);

  const message = useSelector((state) => state.searchEMP.errorMs);

  const page = useSelector((state) => state.searchEMP.page);

  const category = useSelector((state) => state.searchEMP.searchCategory);

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

  const handleOnScrollBtn = useCallback(() => {
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const board = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={10}>
      <Modal open={message} message={message} handleClose={closeDialog} />

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
      <SearchBar />
      {board}
    </>
  );
};

export default Board;

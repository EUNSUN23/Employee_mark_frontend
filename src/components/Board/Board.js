import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import ScrollToTop from "../UI/ScrollToTop";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import { initError } from "../../store/actions/searchEmp";

const EmployeeBoard = styled.section`
  display: grid;
  grid-direction: column;
  grid-template-columns: auto;
  grid-template-rows: 20vh auto;
  align-items: space-between;
  justify-content: space-between;
`;

const SectionCard = styled.section`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  grid-template-rows: auto;
`;

const Board = () => {
  const dispatch = useDispatch();
  const [scrollToTop, setScrollToTop] = useState(null);

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

  const viewport = useRef(null);

  const { isLoading, message, open, categoryObj } = useSelector(
    (state) => ({
      isLoading: state.searchEmp.loading,
      message: state.searchEmp.errorMs,
      open: state.searchEmp.errorMs !== null,
      categoryObj: state.searchBar.category,
    }),
    shallowEqual
  );

  const handleClose = () => {
    dispatch(initError());
  };

  const handleOnScrollBtn = useCallback(() => {
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const content = isLoading ? (
    <Loader type="large" />
  ) : (
    <>
      <Modal message={message} open={open} handleClose={handleClose} />
      <aside />
      <SectionCard ref={viewport}>
        <aside />
        <CardContainer />
        <aside />
      </SectionCard>
      <aside>
        <ScrollToTop
          onScroll={(e) => handleScroll(e)}
          show={scrollToTop}
          handleOnScrollBtn={handleOnScrollBtn}
        />
      </aside>
    </>
  );

  const board = categoryObj ? (
    <>
      <SearchBar />
      <EmployeeBoard>{content}</EmployeeBoard>
    </>
  ) : (
    <EmployeeBoard>
      <Loader type="main" />
    </EmployeeBoard>
  );

  return board;
};

export default Board;

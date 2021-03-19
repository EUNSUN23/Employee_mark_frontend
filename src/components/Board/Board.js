import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import ScrollToTop from "../UI/ScrollToTop";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";
import BoardLoader from "../UI/BoardLoader";
import { initError } from "../../store/actions/searchEMP";

const Board = () => {
  const dispatch = useDispatch();
  const [scrollToTop, setScrollToTop] = useState(null);
  const viewport = useRef(null);
  const isLoading = useSelector((state) => state.searchEMP.loading);
  const isCategoryLoading = useSelector((state) => state.searchBar.loading);

  const message = useSelector((state) => state.searchEMP.errorMs);
  const open = useSelector((state) => state.searchEMP.errorMs !== null);
  const handleClose = () => {
    dispatch(initError());
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

  const handleOnScrollBtn = useCallback(() => {
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const board = isLoading ? (
    <Loader size="large" />
  ) : (
    <Grid container direction="column" spacing={10}>
      <Modal message={message} open={open} handleClose={handleClose} />
      <Grid item></Grid>
      <Grid item container ref={viewport}>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <CardContainer />
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

  const content = isCategoryLoading ? (
    <BoardLoader />
  ) : (
    <>
      <SearchBar />
      {board}
    </>
  );

  return content;
};

export default Board;

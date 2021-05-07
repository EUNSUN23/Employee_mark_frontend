import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import EmployeeCard from "../EmployeeCard";
import { debounce } from "lodash";
import Loader from "../../../UI/Loader";
import { getEmpData } from "../../../../store/actions/searchEmp";
import { getCurrent } from "../../../../shared/utility";
import BoardBackground from "../../BoardBackground";

const EmployeeContainer = styled.article`
  display: grid;
  align-items: space-between;
  justify-content: center;
  grid-gap: 20px;
  grid-template-rows: 1fr;
  @media only screen and (max-width: 786px) {
    grid-template-columns: 70vw;
  }
  @media only screen and (min-width: 786px) {
    grid-template-columns: ${(props) =>
      props.employeeData ? "40vw 40vw" : "70vw"};
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: ${(props) =>
      props.employeeData ? "30vw 30vw" : "60vw"};
  }
`;

const SectionLoader = styled.section`
  transform: translateX(50%);
`;

const CardContainer = () => {
  const dispatch = useDispatch();

  const employeeData = useSelector((state) => state.searchEmp.employeeData);
  const page = useSelector((state) => state.searchEmp.page);
  const isNextLoading = useSelector((state) => state.searchEmp.nextLoading);

  const currentEmp = useSelector(
    (state) => state.searchEmp.openedEmp && state.searchEmp.openedEmp.emp_no,
    shallowEqual
  );

  const nextPage = useRef(page);
  const target = useRef(null);

  const loadItems = debounce(
    (entry, observer) => {
      const currentData = getCurrent();
      dispatch(getEmpData(currentData, page, "intersected"));
      nextPage.current = page;
      observer.unobserve(entry.target);
      observer.observe(target.current);
    },
    [200]
  );

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      loadItems(entry, observer);
    });
  };

  const options = {
    threshold: 1,
  };

  useEffect(() => {
    let io;
    if (isNextLoading) {
      return;
    } else {
      io = new IntersectionObserver(handleIntersection, options);
      if (target.current) {
        io.observe(target.current);
      }
    }

    return () => io && io.disconnect();
  });

  const createEmployeeList = (employeeData, current) => {
    if (!employeeData) {
      return <BoardBackground />;
    }
    const employeeList = employeeData.map((el, idx) => {
      const lastEl = idx === employeeData[employeeData.length - 1].id;

      return (
        <article key={"employee" + idx} ref={lastEl ? target : null}>
          <EmployeeCard {...el.employee} currentEmp={current} />
        </article>
      );
    });

    return employeeList;
  };

  return (
    <>
      <EmployeeContainer employeeData={employeeData}>
        {createEmployeeList(employeeData, currentEmp)}
        {isNextLoading ? (
          <SectionLoader>
            <Loader type="medium" />
          </SectionLoader>
        ) : null}
      </EmployeeContainer>
    </>
  );
};

export default CardContainer;

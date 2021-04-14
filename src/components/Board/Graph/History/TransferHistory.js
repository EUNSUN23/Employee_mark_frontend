import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #bebebe;
  box-sizing: border-box;
  width: 100%;
  border-top: none;
`;

const History = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 3fr 3fr;
  grid-template-rows: auto;
  grid-auto-columns: 4fr 3fr 3fr;
  grid-auto-rows: 1.4fr;
`;

const Title = styled.span`
  text-align: center;
  background-color: #2196f3;
  color: #fff;
  padding: 1% 0;
  border-right: 1px solid #fff;
  &.last-title {
    border: none;
  }
`;

const HistoryItem = styled.span`
  position: relative;
  background-color: #fff;
  color: #000;
  text-align: center;
  padding: 5% 0;
  font-size: ${(props) => (props.children.length > 14 ? "12px" : "12px")};
  border-bottom: 1px solid #bebebe;
  &.last-item {
    border: none;
  }
`;

const compareFunc = (a, b) => {
  const aFrom = parseInt(a.from_date.slice(0, 4));
  const bFrom = parseInt(b.from_date.slice(0, 4));
  return bFrom - aFrom;
};

const TransferHistory = ({ data }) => {
  const makeHistory = (data) => {
    data.sort((a, b) => compareFunc(a, b));
    console.log("arranged", data);
    return data.map((info, idx) => {
      const cssClass = idx === data.length - 1 ? "last-item" : null;
      return (
        <>
          <HistoryItem className={cssClass} key={`item-${idx}_deptName`}>
            {info.dept_name}
          </HistoryItem>
          <HistoryItem className={cssClass} key={`item-${idx}-since`}>
            {info.from_date.slice(0, 10)}
          </HistoryItem>
          <HistoryItem className={cssClass} key={`item-${idx}-to`}>
            {info.to_date === "present" ? "-" : info.to_date.slice(0, 10)}
          </HistoryItem>
        </>
      );
    });
  };
  return (
    <Container>
      <History>
        <Title>부서</Title>
        <Title>Since</Title>
        <Title className="last-title">To</Title>
        {makeHistory(data)}
      </History>
    </Container>
  );
};

export default TransferHistory;

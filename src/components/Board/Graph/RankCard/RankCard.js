import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Svg from "../../../../shared/svgIcons";

const Container = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: auto;
  width: 90%;
  height: 60%;
  margin: 0 auto;
`;

const Entire = styled.div`
  border: 1px solid blue;
`;

const Dept = styled.div`
  border: 1px solid red;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gird-template-rows: auto;
`;

const Title = styled.div`
  border: 1px solid green;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gird-template-rows: auto;
`;

const Badge = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  justify-items: center;
  border: 1px solid black;
  span {
    font-size: 12px;
    text-align: center;
  }
`;

const RankCard = (props) => {
  const { data } = props;
  const { dept_name, title } = useSelector(
    (state) => ({
      dept_name: state.searchEmp.openedEmp.dept_name,
      title: state.searchEmp.openedEmp.title,
    }),
    shallowEqual
  );

  return (
    <Container>
      <Entire>
        <span className="rank">전체</span>
        <span>{`${data.entire}위`}</span>
      </Entire>
      <Dept>
        <Badge>
          <Svg name={dept_name} component="div" />
          <span>{dept_name}</span>
        </Badge>
        <span className="rank">{`${data.dept}위`}</span>
      </Dept>
      <Title>
        <Badge>
          <Svg name={title} component="div" />
          <span>{title}</span>
        </Badge>
        <span className="rank">{`${data.title}위`}</span>
      </Title>
    </Container>
  );
};

export default RankCard;

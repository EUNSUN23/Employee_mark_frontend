import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Svg from "../../../../shared/svgIcons";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  text-align: center;
`;

const RankItem = styled.div`
  display: grid;
  justify-items: center;
  align-content: space-between;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: auto;
  .rank {
    font-weight: bold;
    font-size: 14px;
  }
  .dots {
    display: block;
    color: #4caf50;
  }
`;

const Entire = styled(RankItem)``;

const Dept = styled(RankItem)``;

const Title = styled(RankItem)``;

const Badge = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-content: space-between;
  span {
    font-size: 12px;
    margin-top: 3px;
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
        <Badge>
          <Svg name="Entire" component="div" />
          <span>전체</span>
        </Badge>
        <div className="dots">
          <Svg name="VerticalDots" component="div" fontSize="large" />
        </div>
        <span className="rank">{`${data.entire}위`}</span>
      </Entire>
      <Dept>
        <Badge>
          <Svg name={dept_name} component="div" />
          <span>{dept_name}</span>
        </Badge>
        <div className="dots">
          <Svg name="VerticalDots" component="div" fontSize="large" />
        </div>
        <span className="rank">{`${data.dept}위`}</span>
      </Dept>
      <Title>
        <Badge>
          <Svg name={title} component="div" />
          <span>{title}</span>
        </Badge>
        <div className="dots">
          <Svg name="VerticalDots" component="div" fontSize="large" />
        </div>
        <span className="rank">{`${data.title}위`}</span>
      </Title>
    </Container>
  );
};

export default RankCard;

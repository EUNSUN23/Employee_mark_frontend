import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Svg from "../../../../shared/svgIcons";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  width: 90%;
  @media only screen and (max-width: 992px) and (min-width: 576px) {
    width: 80%;
    height: 50%;
  }
  margin: 0 auto;
  text-align: center;
`;

const RankItem = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: 2fr 2fr 1fr;
  grid-template-columns: auto;
  .rank {
    font-weight: bold;
    font-size: 16px;
    @media only screen and (max-width: 992px) and (min-width: 576px) {
      margin-top: -10px;
      font-size: 1.4vw;
    }
  }
  .dots {
    display: block;
    color: #4caf50;
    @media only screen and (max-width: 992px) and (min-width: 576px) {
      font-size: 12px;
    }
  }
`;

const Entire = styled(RankItem)``;

const Dept = styled(RankItem)``;

const Title = styled(RankItem)``;

const Badge = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  justify-items: center;

  span {
    font-size: 12px;
    text-align: center;
    @media only screen and (max-width: 992px) and (min-width: 576px) {
      margin-top: -10px;
    }
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

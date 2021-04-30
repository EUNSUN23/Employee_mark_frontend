import React, { memo } from "react";
import Svg from "../../../../shared/svgIcons";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto;
  align-content: center;
  justify-items: space-evenly;
  width: 210px;
  background-color: #fff;
  @media only screen and (max-width: 992px) {
    width: 180px;
  }
`;

const SalaryLabel = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: auto;
  grid-gap: 5px;
  align-content: center;
  justify-items: flex-end;
  color: #222;
  font-weight: bold;
  .title {
    text-align: right;
    font-size: 18px;
    line-height: 200%;
  }
  .value {
    font-size: 26px;
  }
  @media only screen and (max-width: 992px) {
    .title {
      font-size: 15px;
    }
    .value {
      font-size: 20px;
    }
  }
`;

const Filter = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  padding: 0;
  position: relative;
  height: 50px;
  .up {
    top: 8%;
    padding-top: 1px;
  }
  .down {
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    box-shadow: 2px 1px 2px 0px #cecece;
  }
`;

const Button = styled.div`
  position: absolute;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-top: 1px solid #efeff0;
  border-left: 1px solid #efeff0;
  background-color: #ffffff;
  box-shadow: 2px 1px 2px 0px #cecece;
  div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 3px;
  }
`;

const SalaryFilter = memo(({ onClickFilter, value }) => {
  const onClickHandler = (icon) => {
    onClickFilter(icon);
  };

  return (
    <Container>
      <SalaryLabel>
        <span className="title">연봉 :</span>
        <span className="value">{value}</span>
      </SalaryLabel>
      <Filter>
        <Button className="up" onClick={() => onClickHandler("up")}>
          <Svg name="ArrowUp" component="div" fontSize="small" />
        </Button>
        <Button className="down" onClick={() => onClickHandler("down")}>
          <Svg name="ArrowDown" component="div" fontSize="small" />
        </Button>
      </Filter>
    </Container>
  );
});

export default SalaryFilter;

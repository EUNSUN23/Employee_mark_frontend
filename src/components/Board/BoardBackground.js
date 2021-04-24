import React from "react";
import Svg from "../../shared/svgIcons";
import styled from "styled-components";

const EmployeeSearch = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 80vh;

  div {
    position: absolute;
    left: -10%;
    top: 55%;
    transform: translateY(-50%);
    font-size: 42vw;
    color: #cecece;
  }
  span {
    position: absolute;
    width: 50%;
    top: 50%;
    left: 46%;
    transform: translateY(-50%);
    font-size: 1.3vw;
    color: grey;
    width: 46%;
    line-height: 170%;
  }
`;

const BoardBackground = () => {
  return (
    <EmployeeSearch>
      <Svg name="EmployeeCard" component="div" />
      <span>
        <strong>Tip)</strong> 직원의 <strong>부서/직급/이름</strong> 정보를
        입력하세요
      </span>
    </EmployeeSearch>
  );
};

export default BoardBackground;

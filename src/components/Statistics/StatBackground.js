import React from "react";
import styled from "styled-components";
import Svg from "../../shared/svgIcons";

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 80vh;

  div {
    position: absolute;
    left: 15%;
    top: 40%;
    transform: translateY(-50%);
    font-size: 32vw;
    color: #cecece;
  }
  ul {
    position: absolute;
    padding: none;
    top: 40%;
    left: 46%;
    transform: translateY(-50%);
    font-size: 1.3vw;
    color: grey;
    width: 46%;
    line-height: 170%;
  }
  li {
    list-style: none;
    width: 70%;
    padding-bottom: 10px;
  }
`;

const StatBackground = () => {
  return (
    <Container>
      <Svg name="Statistics" component="div" />
      <ul>
        <li>
          연봉 범위를 <strong>직접 설정</strong>하려면{" "}
          <strong>'기준-급여'</strong> 카테고리를,
        </li>
        <li>
          만(10,000)단위 연봉 분포도를 조회하려면 <strong>'기준-조직'</strong>{" "}
          카테고리를 선택하세요
        </li>
      </ul>
    </Container>
  );
};

export default StatBackground;

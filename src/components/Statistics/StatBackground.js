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
          <strong>TIP)</strong> <strong>'상세 연봉별 부서순위'</strong>를 통해서
          상세 연봉에 따른 부서 순위를 조회할 수 있습니다.
        </li>
      </ul>
    </Container>
  );
};

export default StatBackground;

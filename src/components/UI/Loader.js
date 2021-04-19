import React from "react";
import styled from "styled-components";

const Large = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  &::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  margin: 200px auto;
  font-size: 8px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.5em solid rgba(43, 156, 243, 0.2);
  border-right: 1.5em solid rgba(43, 156, 243, 0.2);
  border-bottom: 1.5em solid rgba(43, 156, 243, 0.2);
  border-left: 1.5em solid #2b9cf3;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Medium = styled(Large)`
  margin: 100px auto;
`;

const Small = styled(Large)`
  width: 8em;
  height: 8em;
  &::after {
    width: 8em;
    height: 8em;
  }
  margin: 0px 30px;
  font-size: 5px;
  border-top: 1.2em solid rgba(43, 156, 243, 0.2);
  border-right: 1.2em solid rgba(43, 156, 243, 0.2);
  border-bottom: 1.2em solid rgba(43, 156, 243, 0.2);
  border-left: 1.2em solid #2b9cf3;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  .loader {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
    &::before,
    &::after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
      content: "";
      position: absolute;
      top: 0;
    }

    color: #076df2;
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;

    &::before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    &::after {
      left: 3.5em;
    }
    @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
    @keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
  }
  .info {
    text-align: center;
    padding-top: 80px;
  }
`;

const Loader = ({ type }) => {
  const setSize = (type) => {
    switch (type) {
      case "large":
        return <Large />;
      case "medium":
        return <Medium />;
      case "small":
        return <Small />;
      case "main":
        return (
          <Main>
            <h1 className="info">Employee 데이터를 불러오고 있습니다</h1>
            <div className="loader"></div>
          </Main>
        );
      default:
        return <Large />;
    }
  };

  return setSize(type);
};

export default Loader;

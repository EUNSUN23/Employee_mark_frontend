import React, { memo } from "react";
import styled from "styled-components";
import Svg from "../../shared/svgIcons";

const Container = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  padding: 3px;
  background-color: green;
  border-radius: 100%;
  opacity: ${(props) => (props.show ? 1 : 0)};
  position: fixed;
  right: 5%;
  bottom: 40px;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.23), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Text = styled.span`
  color: #fff;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ArrowIcon = styled.div`
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-30%, -8%);
`;

const ScrollToTop = memo((props) => {
  const { show, handleOnScrollBtn } = props;
  return (
    <Container
      show={show}
      onClick={() => {
        handleOnScrollBtn();
      }}
    >
      <ArrowIcon>
        <Svg name="Expandless" size="small" />
      </ArrowIcon>
      <Text>top</Text>
    </Container>
  );
});

export default ScrollToTop;

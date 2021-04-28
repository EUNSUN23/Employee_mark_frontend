import React, { forwardRef } from "react";
import Svg from "../../shared/svgIcons";
import styled from "styled-components";

const Backward = styled.div`
  position: relative;
  cursor: pointer;
  color: ${(props) => (props.disabled ? "grey" : "#222")};
  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    fonts-size: 50px;
  }
`;

const Forward = styled(Backward)``;

const SlideNav = forwardRef((props, ref) => {
  const { disabled, direction, onClickNav } = props;

  console.log("disabled", disabled);

  const navArrow =
    direction === "backward" ? (
      <Backward
        ref={ref}
        onClick={() => onClickNav()}
        disabled={disabled === "backward"}
      >
        <div>
          <Svg name="ArrowLeft" component="div" />
        </div>
      </Backward>
    ) : (
      <Forward
        ref={ref}
        onClick={() => onClickNav()}
        disabled={disabled === "forward"}
      >
        <div>
          <Svg name="ArrowRight" component="div" />
        </div>
      </Forward>
    );

  return navArrow;
});

export default SlideNav;

import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Svg from "../../shared/svgIcons";
import { deleteKeyword } from "../../store/actions/keywords";

const Container = styled.div`
  margin: 0 5%;
  transform: translateX(70%);
  height: 20px;
  &:hover {
    color: red;
  }
`;

const ClearBtn = ({ identifier }) => {
  const dispatch = useDispatch();

  const onClickDel = (identifier) => {
    dispatch(deleteKeyword(identifier));
  };

  return (
    <Container onClick={() => onClickDel(identifier)}>
      <Svg name="Delete" size="small" />
    </Container>
  );
};

export default memo(ClearBtn);

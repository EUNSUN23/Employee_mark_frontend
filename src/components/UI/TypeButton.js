import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Container = styled.div`
display: "flex",
flexDirection: "row",
`;

const ButtonEl = styled(Button)`
flex: 1fr;
padding: 1;
cursor: pointer;
boxSizing: content-box;
alignItems: flex-start;
margin: 4;
color: ${(props) => (props.clicked === props.type ? "white" : "#039BE5")};
border: :${(props) =>
  props.clicked === props.type ? "none" : "1px solid #039BE5"};
backgroundColor:${(props) =>
  props.clicked === props.type ? "#0288D1" : "#039BE5"};
&:focus: {
  backgroundColor: ${(props) =>
    props.clicked === props.type ? "#0288D1" : "#039BE5"};
    color: ${(props) => (props.clicked === props.type ? "white" : "#039BE5")};
    border: :${(props) =>
      props.clicked === props.type ? "none" : "1px solid #039BE5"};
}
`;

const TypeButton = ({ type1, type2, clicked, getData }) => {
  return (
    <Container>
      <ButtonEl
        variant="outlined"
        size="small"
        color="primary"
        type={type1}
        clicked={clicked}
        disableRipple
        onClick={() => {
          getData(
            "rank",
            "period",
            empInfo.emp_no,
            empInfo.dept_name,
            empInfo.title
          );
        }}
      >
        근속 랭킹
      </ButtonEl>
      <ButtonEl
        variant="outlined"
        size="small"
        color="primary"
        type={type2}
        clicked={clicked}
        disableRipple
        onClick={() => {
          getData(
            "rank",
            "salary",
            empInfo.emp_no,
            empInfo.dept_name,
            empInfo.title
          );
        }}
      >
        연봉 랭킹
      </ButtonEl>
    </Container>
  );
};

export default TypeButton;

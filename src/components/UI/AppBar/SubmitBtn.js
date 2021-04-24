import { memo } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const StyledButton = styled(Button)`
  @media only screen and (max-width: 768px) {
    position: absolute;
    left: ${(props) => props.shrink && "10vw"};
    fontsize: 1.3vw;
    min-width: 4vw;
  }
  .MuiButton-label {
    color: #fff;
  }
`;

const SubmitBtn = (props) => {
  const { selected, onSubmitHandler, children } = props;

  console.log("BUTTON RENDER");

  const shrink = !selected || selected.type !== "area";

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler();
  };

  return (
    <StyledButton
      variant="contained"
      color="secondary"
      shrink={shrink}
      onClick={(e) => onSubmit(e)}
    >
      {children}
    </StyledButton>
  );
};

export default memo(
  SubmitBtn,
  (prevProps, nextProps) => prevProps.selected !== nextProps.selected
);

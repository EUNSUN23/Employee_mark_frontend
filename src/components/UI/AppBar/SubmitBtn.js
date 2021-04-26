import { memo } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const StyledButton = styled(Button)`
  fontsize: 1.3vw;
  min-width: 4vw;
  .MuiButton-label {
    color: #fff;
  }
`;

const SubmitBtn = (props) => {
  const { onSubmitHandler, children } = props;

  return (
    <StyledButton
      variant="contained"
      color="secondary"
      onClick={(e) => {
        e.preventDefault();
        onSubmitHandler();
      }}
    >
      {children}
    </StyledButton>
  );
};

export default memo(SubmitBtn);

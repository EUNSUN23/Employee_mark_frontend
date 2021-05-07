import { memo } from "react";
import { Button, withStyles } from "@material-ui/core";
import theme from "../../../shared/theme";

const StyledButton = withStyles({
  contained: {
    fontSize: "14px",
    width: "4vw",
    height: "7vh",
    [theme.breakpoints.down("md")]: {
      marginLeft: "-20px",
    },
    marginLeft: "-40px",
    color: "#fff",
  },
})(Button);

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

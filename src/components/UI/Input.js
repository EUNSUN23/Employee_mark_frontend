import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import theme from "../../shared/theme";

export const Input = withStyles({
  root: {
    color: theme.palette.common.white,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      width: "100%",
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20vw",
    },
  },
})(InputBase);

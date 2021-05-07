import { withStyles, fade } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import theme from "../../shared/theme";

const BoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

export const SalarySlider = withStyles({
  root: {
    width: "20vw",
    color: "#6868ff",
    height: 2,
    padding: "15px 0",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  thumb: {
    height: "16px",
    width: "16px",
    marginTop: -6,
    marginLeft: -8,
    backgroundColor: "#fff",
    boxShadow: BoxShadow,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      "@media (hover: none)": {
        boxShadow: BoxShadow,
      },
    },
  },
  track: {
    height: "1vh",
  },
  trackInverted: {
    height: "1vh",
    "& $rail": {
      backgroundColor: "#6868ff",
    },
  },
  rail: {
    height: "1vh",
    opacity: 1,
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: "2vh",
    width: 1,
    marginTop: -4,
  },
  markActive: {
    opacity: 1,
  },
})(Slider);

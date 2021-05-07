import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import theme from "../../../shared/theme";

export const DetailMenuBtn = withStyles({
  contained: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "42vw",
    [theme.breakpoints.up("lg")]: {
      width: "28vw",
    },
    height: "8vh",

    "& .titleText": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
      transition: theme.transitions.create("width"),
      width: "35vw",
      [theme.breakpoints.up("lg")]: {
        width: "25vw",
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: "25px",
      },
    },
  },
  iconSizeLarge: {
    position: "absolute",
    left: "0%",
    color: "#fff",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})(Button);

export const DefaultMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: "35vw",
    [theme.breakpoints.up("lg")]: {
      width: "25vw",
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export const DefaultMenuItem = withStyles({
  root: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "40vw",
    [theme.breakpoints.up("lg")]: {
      width: "25vw",
    },
    height: "8vh",
    [theme.breakpoints.up("xl")]: {
      height: "4.5vh",
      fontSize: "25px",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "&.menu_disabled": {
      textAlign: "center",
    },
  },
})(MenuItem);

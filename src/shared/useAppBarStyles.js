import { makeStyles } from "@material-ui/core/styles";

const useAppBarStyles = makeStyles((theme, selected) => ({
  grow: {
    flexGrow: 1,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
  },
  appBar: {
    height: "14vh",
    [theme.breakpoints.up("xl")]: {
      height: "10vh",
    },
  },
  home: {
    cursor: "pointer",
    width: 80,
    height: 30,

    "& .icon_home": {
      width: 28,
      height: 28,
    },
  },
  home_hover: {
    "& span": {
      fontWeight: "bold",
    },
    "& .icon_home": {
      width: 30,
      height: 30,
    },
  },
  statistics: {
    cursor: "pointer",
    width: 100,
    height: 30,
    "& .icon_statistics": {
      width: 28,
      height: 28,
    },
  },
  statistics_hover: {
    "& span": {
      fontWeight: "bold",
    },
    "& .icon_statistics": {
      width: 30,
      height: 30,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      fontSize: "2vw",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5vw",
  },
  link_mobile: {
    color: "black",
    textDecoration: "none",
  },
  searchContainer: {
    position: "relative",
    width: "100vw",
    height: "14vh",
    [theme.breakpoints.up("sm")]: {
      width: "48vw",
    },
  },

  submit: {
    color: "white",
    fontSize: "1.3vw",
    minWidth: "6vw",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: selected && selected.type === "area" ? "45vw" : "60vw",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.3vw",
      minWidth: "4vw",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    display: "block",
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translate(-50%,-50%)",
    [theme.breakpoints.down("xs")]: {
      transform: "translate(-25%,-50%)",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default useAppBarStyles;

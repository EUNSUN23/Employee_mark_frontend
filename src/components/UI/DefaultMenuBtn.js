import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Svg from "../../shared/svgIcons";
import theme from "../../shared/theme";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title_container: {
    position: "relative",
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    height: "8vh",
    [theme.breakpoints.up("xl")]: {
      height: "4.5vh",
      fontSize: "25px",
    },
  },
  title_listItemIcon: {
    position: "absolute",
    left: "0%",
    color: "white",
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title_listItemText: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "50vw",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "25px",
    },
  },
}));

const DefaultMenuBtn = ({ value, initValue, onClickHandler }) => {
  const classes = useStyles();
  return (
    <Button
      aria-controls="customized-menu"
      aria-haspopup="true"
      variant="contained"
      color="primary"
      onClick={onClickHandler}
      className={classes.title_container}
    >
      <ListItemIcon className={classes.title_listItemIcon}>
        <Svg name="ArrowDown" fontSize="large" component="div" />
      </ListItemIcon>
      <ListItemText
        primary={value ? value : initValue}
        className={classes.title_listItemText}
      />
    </Button>
  );
};

export default DefaultMenuBtn;

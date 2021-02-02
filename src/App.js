import { Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Products from "./Products";

const useStyles = makeStyles({
  helloThereStyle: {
    fontStyle: "oblique",
    color: "red",
    fontSize: "30PX",
  },
  buttonStyle: {
    color: "blue",
    border: "0",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Typography
        className={classes.helloThereStyle}
        variant="h1"
        color="primary"
      >
        어서 오세요!
      </Typography>
      <Button
        className={classes.buttonStyle}
        color="secondary"
        variant="outlined"
      >
        클릭하세요
      </Button>
      <Products />
    </div>
  );
};

export default App;

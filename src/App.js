import { Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Board from "./components/EmployeeBoard/Board";
import Track from "./components/Track";
import HistoryButton from "./components/HistoryButton";

const useStyles = makeStyles({});

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Board />
      <HistoryButton />
    </div>
  );
};

export default App;

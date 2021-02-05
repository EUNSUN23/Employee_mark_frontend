import { Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Board from "./components/EmployeeBoard/Board";
import Track from './components/Track';

const useStyles = makeStyles({});

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Board />
      <Track/>
    </div>
  );
};

export default App;

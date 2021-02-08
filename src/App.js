import Board from "./components/EmployeeBoard/Board";
import DefaultLayout from "./components/DefaultLayout";

const App = () => {
  return (
    <div className="App">
      <DefaultLayout>
        {" "}
        <Board />
      </DefaultLayout>
    </div>
  );
};

export default App;

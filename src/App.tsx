import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BulkDelete from "./components/BulkDelete";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import MyContext from "./MyContext";

function App() {
  return (
    <div className="App">
      <MyContext>
        <Routes>
          <Route path="/create-task" element={<CreateTask />}></Route>
          <Route path="/bulk-delete" element={<BulkDelete />}></Route>
          {["/", "/list-task"].map((path, index) => (
            <Route path={path} key={index} element={<ListTasks />}></Route>
          ))}
        </Routes>
      </MyContext>
    </div>
  );
}

export default App;

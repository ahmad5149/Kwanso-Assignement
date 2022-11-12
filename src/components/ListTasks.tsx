import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../MyContext";
import Task from "./Task";

function ListTasks() {
  const { tasksList } = useContext(Context);

  return (
    <Container className="pt-5">
      <Row>
        <h2 className="text-center">Task List</h2>
        {tasksList.map((task: any, i: number) => {
          return <Task task={task} key={i} />;
        })}
        <div className="d-flex">
          <Link to="/bulk-delete" className="pe-2">
            Bulk Delete
          </Link>
          <Link to="/create-task">Create Tasks</Link>
        </div>
      </Row>
    </Container>
  );
}

export default ListTasks;

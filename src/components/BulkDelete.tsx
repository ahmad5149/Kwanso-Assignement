import { useContext, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../MyContext";
import Task from "./Task";
import { tasksTyps } from "./Task";

function BulkDelete() {
  const { tasksList, setTaskList } = useContext(Context);
  const [deleteTasks, setDeleteTasks] = useState<any>([]);
  const [checked, setChecked] = useState<any>();
  const bulkDelete = () => {
    const remainingTasks = tasksList.filter((task: tasksTyps) => {
      return !deleteTasks.some((forDelete: tasksTyps) => {
        return task.id === forDelete.id;
      });
    });

    setTaskList(remainingTasks);
  };
  return (
    <Container className="pt-5">
      <Row>
        <h2 className="text-center">Task List</h2>
        {tasksList.map((task: any, i: number) => {
          return (
            <Task
              task={task}
              key={i}
              setDeleteTasks={setDeleteTasks}
              deleteTasks={deleteTasks}
            />
          );
        })}
        <div className="d-flex">
          <Button onClick={() => bulkDelete()} className="me-3">
            Bulk Delete
          </Button>
          <Link to="/"> Task List</Link>
        </div>
      </Row>
    </Container>
  );
}

export default BulkDelete;

import { useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";

export interface tasksTyps {
  id: number;
  task: string;
  buklDelete: boolean;
}
type props = {
  task: tasksTyps;
  setDeleteTasks?: any;
  deleteTasks?: any;
};
function Task({ task, setDeleteTasks, deleteTasks }: props) {
  const [checked, setChecked] = useState<boolean>(false);

  const location = useLocation();

  const selectForDelete = (task: any, e: any) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
      const exist = deleteTasks.filter((existTask: tasksTyps) => {
        return existTask.id === task.id;
      });

      if (!exist.length) {
        setDeleteTasks((deleteTasks: any) => {
          return [...deleteTasks, { ...task }];
        });
      }
    } else {
      const taskRemoved = deleteTasks.filter((removeTask: tasksTyps) => {
        return removeTask.id !== task.id;
      });

      setDeleteTasks(taskRemoved);
    }
  };

  return (
    <Col className="pb-3" md={3}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          {location.pathname === "/bulk-delete" && (
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                checked={checked}
                onChange={(e: any) => selectForDelete(task, e)}
              />
            </Form.Group>
          )}
          <Card.Title>{task.task}</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Task;

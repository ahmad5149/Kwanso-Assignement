import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Context } from "../MyContext";

function CreateTask() {
  const [task, setTask] = useState<string>("");
  const { setTaskList } = useContext(Context);
  const navigate = useNavigate();

  const submitForm = (event: any) => {
    event.preventDefault();
    if (!task) {
      alert("Please enter task name!");
      return;
    }

    setTaskList((tasksList: any) => {
      return [...tasksList, { id: Date.now(), task }];
    });
    navigate("/");
  };
  return (
    <Container className="pt-5">
      <Row>
        <h2 className="text-center">Create a Task</h2>
        <Col></Col>
        <Col xs={6}>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={task}
                onChange={(e: any) => setTask(e.target.value)}
              />
            </Form.Group>
            <Button title="Create" variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default CreateTask;

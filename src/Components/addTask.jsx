import React, { useState, useEffect } from "react";
import TaskList from "./taskList";
import { Form, InputGroup, Button } from "react-bootstrap";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const storedTaskList = localStorage.getItem("taskList");
    return storedTaskList ? JSON.parse(storedTaskList) : [];
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() !== "") {
      const newTask = {
        task,
        completed: false,
      };
      localStorage.setItem("taskList", JSON.stringify([...taskList, newTask]));

      setTaskList([...taskList, newTask]);

      setTask("");
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
  };

  const handleTaskDelete = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
  };

  const handleDeleteCompleted = () => {
    const updatedTaskList = taskList.filter((task) => !task.completed);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const hasCompletedTasks = taskList.some((task) => task.completed);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3 mt-3">
        <Button onClick={() => setFilter("All")}>All</Button>{" "}
        <Button variant="danger" onClick={() => setFilter("Active")}>
          Active
        </Button>{" "}
        <Button variant="success" onClick={() => setFilter("Completed")}>
          Completed
        </Button>{" "}
      </div>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3 d-flex gap-3">
          <Form.Control
            type="text"
            name="task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            autoFocus
            required
            placeholder="Enter task"
          />
          <Button type="submit" variant="info">
            Add
          </Button>
        </InputGroup>
      </Form>
      <TaskList
        taskList={taskList}
        onCheckboxChange={handleCheckboxChange}
        onTaskDelete={handleTaskDelete}
        filter={filter}
      />
      {hasCompletedTasks && (
        <Button variant="success" onClick={handleDeleteCompleted}>
          Delete Completed
        </Button>
      )}
    </div>
  );
};

export default AddTask;

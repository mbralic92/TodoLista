import React, { useState } from "react";
import TaskList from "./taskList";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() !== "") {
      const newTask = {
        task,
        completed: false,
      };

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
            value={task}
            autoFocus
            required
          />
        </label>
        <input type="submit" value="Add" />
      </form>

      <TaskList
        taskList={taskList}
        onCheckboxChange={handleCheckboxChange}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default AddTask;

import React, { Component } from "react";
import PropTypes from "prop-types";
import CloseButton from "react-bootstrap/CloseButton";

class TaskList extends Component {
  render() {
    const { taskList } = this.props;
    const { filter } = this.props;

    const filteredTaskList = taskList.filter((task) => {
      if (filter === "All") {
        return true;
      } else if (filter === "Active") {
        return !task.completed;
      } else if (filter === "Completed") {
        return task.completed;
      }
      return false;
    });

    return (
      <div>
        {filteredTaskList.map((task, index) => (
          <div
            key={crypto.randomUUID()}
            className={`d-flex justify-content-between mb-3 mt-3 ${
              task.completed
                ? "bg-success"
                : filter === "Active"
                ? "bg-danger"
                : "bg-info"
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => this.props.onCheckboxChange(index)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.task}
            </span>

            <CloseButton onClick={() => this.props.onTaskDelete(index)}>
              {" "}
            </CloseButton>
          </div>
        ))}
      </div>
    );
  }
}

TaskList.propTypes = {
  taskList: PropTypes.array,
  onCheckboxChange: PropTypes.func,
  onTaskDelete: PropTypes.func,
  filter: PropTypes.string,
};

export default TaskList;

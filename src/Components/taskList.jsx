import React, { Component } from "react";

class TaskList extends Component {
  render() {
    const { taskList } = this.props;

    return (
      <div>
        {taskList.map((task, index) => (
          <div key={crypto.randomUUID()}>
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
            <button onClick={() => this.props.onTaskDelete(index)}>x</button>
          </div>
        ))}
      </div>
    );
  }
}

export default TaskList;

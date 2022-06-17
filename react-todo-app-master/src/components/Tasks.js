import React from 'react';

const Tasks = ({task, deleteTask}) => {

  const callDeleteTaskFunction = (id) => {
    deleteTask(id);
  }

  return (
    <div className="task">
      <p>{task.title}</p>
      <button className="close" title="Delete" onClick={() => callDeleteTaskFunction(task.id)}>
        <div className="line line1"></div>
        <div className="line line2"></div>
      </button>
    </div>
  )
}

export default Tasks

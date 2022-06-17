import React, {useState} from 'react'

const Modal = ({add, clear}) => {
  const [taskValue, setTaskValue] = useState("");

  const handleTaskInputChanges = (e) => {
    setTaskValue(e.target.value);
  }

  const resetInputField = () => {
    setTaskValue("");
  }

  const callAddTaskFunction = (e) => {
    e.preventDefault();
    add(taskValue);
    resetInputField();
  }

  const callClearTaskFunction = (e) => {
    e.preventDefault();
    clear(taskValue);
    resetInputField();
  }

  return (
    <form className="new_task">
      <input
        value={taskValue}
        onChange={handleTaskInputChanges}
        type="text"
        placeholder="Task"
        className="input"
        required
      />
      <input 
        onClick={callAddTaskFunction}
        type="submit" 
        value="Save"
        className="btn" 
      />
      <input 
        onClick={callClearTaskFunction}
        type="button" 
        value="Clear All"
        className="btn clear" 
      />
    </form>
  )
}

export default Modal

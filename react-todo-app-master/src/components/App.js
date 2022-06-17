import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Tasks from './Tasks';
import Modal from './Modal';
import {useCookies} from 'react-cookie';

const initialState = {
  tasks: []
}

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const CLEAR_TASKS = 'CLEAR_TASKS';
const GET_TASK = 'GET_TASK';

const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        tasks: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: action.payload
      };
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return state;
  }
};

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['tasks']);
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks } = state;

  useEffect(() => {
    dispatch({
      type: GET_TASK,
      payload: cookies.tasks
    });
  }, []);

  const add = taskValue => {
    if (!state.tasks) {
      dispatch({
        type: ADD_TASK,
        payload: [{
          title: taskValue,
          id: Math.random()
        }]
      });
      
      setCookie('tasks', [{
        title: taskValue,
        id: Math.random()
      }]);
    } else {
      dispatch({
        type: ADD_TASK,
        payload: [...state.tasks, {
          title: taskValue,
          id: Math.random()
        }]
      });
      
      setCookie('tasks', [...state.tasks, {
        title: taskValue,
        id: Math.random()
      }]);
    }
    
  };

  const deleteTask = taskId => {
    let tasks = state.tasks.filter(task => task.id !== taskId);
    setCookie('tasks', tasks);
    dispatch({
      type: DELETE_TASK,
      payload: tasks
    });
  };

  const clear = () => {
    removeCookie('tasks');
    dispatch({
      type: CLEAR_TASKS,
      payload: []
    })
    dispatch({
      type: GET_TASK,
      payload: []
    })
  };

  return (
    <div className="container">
      <div className="panel">
        <div className="panel-header">
          <Modal add={add} clear={clear}/>
        </div>
        <div className="panel-body">
          <div className="tasks">
            {
              tasks ? 
                tasks.map( (task, index) => (
                  <Tasks key={`${index}-${task.title}`} task={task} deleteTask={deleteTask} />
                )) : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

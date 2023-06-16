import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './TaskManager.css'
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [alltasks, setalltasks] = useState([])
 


  const geteachtask = async () => {
    const getTasks = await fetch('https://task-manager-backend-ogvv.onrender.com/api/v1/tasks/');
    const json = await getTasks.json();
    console.log('Fetched Data');
    console.log(json);
    setalltasks(json);
  }
  
  useEffect(() => {
    geteachtask();
  }, [alltasks]);
  

  

  

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleTaskSubmit = async (event) => {
    event.preventDefault();

    const addnewtask = await axios.post('https://task-manager-backend-ogvv.onrender.com/api/v1/tasks/', { "task": newTask,"completed":false })
    // if (newTask.trim() !== '') {
    //   setTasks([...tasks, newTask]);
    //   setNewTask('');
    // }
  };
  // const [editable, seteditable] = useState(false)
  const handleTaskDelete = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const deletingTask = await axios.delete(`https://task-manager-backend-ogvv.onrender.com/api/v1/tasks/${index}`)
    setTasks(updatedTasks);
  };

  const handleCheckBox=async(e,index)=>{
    const updateCheck =await axios.patch(`https://task-manager-backend-ogvv.onrender.com/api/v1/tasks/${index}/${e}`)
  }
  // const editSave = 
  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleTaskChange}
          placeholder="Enter a task"
          className="task-input"
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
      <ul className="task-list">
        {alltasks && alltasks.map((task) => (
          
          <li key={task._id} className="task-item">
            <input type="checkbox" checked={task.completed} onChange={(e)=>{handleCheckBox(e.target.checked,task._id)}}/>
            <span id={task._id} className={`tasks ${task.completed ? 'completed' : ''}`} >{task.task}</span>
            <button onClick={async() => { setNewTask(task.task);await handleTaskDelete(task._id) }}>
              <FontAwesomeIcon icon={faEdit} className="update-icon" />
            </button>
            <button onClick={() => handleTaskDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

import React, { useState, useEffect } from 'react';
import axios from "axios"


export default function Todo() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [tasksData, setTasksData] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    setTask('');
    setDate('');
    const data = { task, date };
    console.log(data);
    try {
      axios.post("http://localhost:5000/addtask", { data });
    } catch (error) {
      console.log(error);
    }
  };


  const apiUrl = 'http://localhost:5000/gettask';

  const fetchTaskData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTasksData(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTaskData(apiUrl);
  }, []);

  let renderTasks = <h2>NO TASK IS AVAILABLE</h2>;

  if (tasksData.length > 0) {
    renderTasks = tasksData.map((taskItem, index) => {
      return (
        <center key={taskItem.id}>
          <div className="container text-center" id="todo">
            <div className="row">
              <div className="col-sm">
                <h2 className="d1">
                  <input type="checkbox" />
                  {taskItem.task}
                </h2>
              </div>
              <div className="col-sm">
                <h2 className="d2">{taskItem.date}</h2>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {

                    const taskId = taskItem.id;
                    try {
                      axios.delete(`http://localhost:5000/deletetask/${taskId}`);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </center>
      );
    });
  }

  return (
    <center>
      <div className="container text-center" id="todo">
        <div className="row">
          <div className="col-sm">
            <input
              type="text"
              placeholder="Enter to do"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
              id="input"
            />
          </div>
          <div className="col-sm">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="col-sm">
            <button type="button" onClick={addTask} className="btn btn-success">
              Add
            </button>
          </div>
        </div>
        <div className=" render my-20">{renderTasks}</div>
      </div>
    </center>
  );
}

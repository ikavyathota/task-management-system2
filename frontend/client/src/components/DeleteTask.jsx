import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteTask.css';

const DeleteTask = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks/list', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleCheckboxChange = (e, taskId) => {
    if (e.target.checked) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleDeleteTasks = async () => {
    try {
      await axios.delete('http://localhost:8000/api/tasks/delete', {
        data: { taskIds: selectedTasks },
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
      alert('Selected tasks deleted successfully');
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; 
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; 
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
 
  return (
    <div className="delete-task">
      <h2>Delete Tasks</h2>
      <table className="delete-task-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created On</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  className="delete-task-checkbox"
                  value={task.id}
                  onChange={e => handleCheckboxChange(e, task.id)}
                />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{formatDate(task.createdOn)}</td>
              <td>{task.createdBy}</td>
              <td>{task.assignedTo}</td>
              <td>{formatDate(task.dueDate)}</td>
              <td>{task.status}</td>
              <td>{task.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="delete-task-button" onClick={handleDeleteTasks}>Delete</button>
    </div>
  );
}

export default DeleteTask;
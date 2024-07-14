import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks/list', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);
        updateOverdueCount(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  const updateOverdueCount = (tasks) => {
    const count = tasks.filter(task => new Date(task.dueDate) < new Date()).length;
    setOverdueCount(count);
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
    <div className="notification">
      <h2>Overdue Tasks</h2>
      <div>Total Overdue Tasks: {overdueCount}</div>
      <table className="notification-table">
        <thead>
          <tr>
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
    </div>
  );
}

export default Notification;

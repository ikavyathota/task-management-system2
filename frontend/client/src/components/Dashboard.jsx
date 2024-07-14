
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { useUser } from '../context/UserContext';
import DeleteTask from './DeleteTask';
import './DeleteTask.css';
import UpdateTask from './UpdateTask';
import './UpdateTask.css'
import ListTask from './ListTask'
import './ListTask.css'
import Notification from './Notification'
import './Notification.css'

const Dashboard = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const { user } = useUser();
  const token = localStorage.getItem('token'); 
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    category: 'Low',
    createdBy: email,
    assignedTo: email
  });
  const [view, setView] = useState(''); 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/list', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
        setFormData(f => ({ ...f, assignedTo: email }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/tasks/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Task created successfully');
      setView(''); 
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        status: 'pending',
        category: 'Low',
        createdBy: email,
        assignedTo: email
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
  <h1>Task Management System</h1>
  <div className="user-interaction">
    <div className="welcome">Welcome, {email || user.email}</div>
    <button onClick={() => navigate('/login')} className="logout-button">Logout</button>
  </div>
</header>

      <div className="container">
        <nav className="sidebar">
          <ul>
          <li onClick={() => setView(view === 'notification' ? '' : 'notification')}>
              {view === 'notification' ? 'Hide Overdues' : 'Overdues'}
            </li>
            <li onClick={() => setView(view === 'create' ? '' : 'create')}>
              {view === 'create' ? 'Hide Task Form' : 'Create Task'}
            </li>
            <li onClick={() => setView(view === 'delete' ? '' : 'delete')}>
              {view === 'delete' ? 'Hide Delete Tasks' : 'Delete Task'}
            </li>
            <li onClick={() => setView(view === 'update' ? '' : 'update')}>
              {view === 'update' ? 'Hide Update Tasks' : 'Update Task'}
            </li>
            <li onClick={() => setView(view === 'list' ? '' : 'list')}>
              {view === 'list' ? 'Hide Filter Tasks' : 'Filter Tasks'}
            </li>
          </ul>
        </nav>
        <main className="content">
          {view === 'create' && (
            <div className="create-task-form">
              <h2>Create Task</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Title:
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </label>
                <label>
                  Description:
                  <textarea name="description" value={formData.description} onChange={handleInputChange} />
                </label>
                <label>
                  Due Date:
                  <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} />
                </label>
                <label>
                  Status:
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <fieldset>
                  <legend>Priority:</legend>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="Low"
                      checked={formData.category === 'Low'}
                      onChange={handleInputChange}
                    />
                    Low
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="Medium"
                      checked={formData.category === 'Medium'}
                      onChange={handleInputChange}
                    />
                    Medium
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="High"
                      checked={formData.category === 'High'}
                      onChange={handleInputChange}
                    />
                    High
                  </label>
                </fieldset>
                <br/>
                <label>
                  Assign Task To:
                  <select name="assignedTo" value={formData.assignedTo} onChange={handleInputChange}>
                    {users.map(user => (
                      <option key={user.email} value={user.email}>{user.email}</option>
                    ))}
                  </select>
                </label>
                <button type="submit">Create</button>
              </form>
            </div>
          )}
          {view === 'delete' && <DeleteTask token={token} />}
          {view === 'update' && <UpdateTask token={token} />} 
          {view === 'list' && <ListTask token={token} />}
          {view === 'notification' && <Notification token={token} />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

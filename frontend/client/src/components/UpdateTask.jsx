import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTask = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]); 
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksResponse = await axios.get('http://localhost:8000/api/tasks/list', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(tasksResponse.data);

                const usersResponse = await axios.get('http://localhost:8000/api/users/list', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleEdit = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, isEditing: true };
            }
            return task;
        }));
        setEditTaskId(id);
    };

    const handleSave = async (id, updatedTask) => {
        try {
            await axios.put(`http://localhost:8000/api/tasks/${id}/update`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.map(task => {
                if (task.id === id) {
                    return { ...task, ...updatedTask, isEditing: false };
                }
                return task;
            }));
            setEditTaskId(null);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, [name]: value };
            }
            return task;
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <table className="update-task-table">
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        {task.isEditing ? (
                            <>
                                <td><input className="update-task-input" type="text" value={task.title} name="title" onChange={(e) => handleChange(e, task.id)} /></td>
                                <td><input className="update-task-input" type="text" value={task.description} name="description" onChange={(e) => handleChange(e, task.id)} /></td>
                                <td>{formatDate(task.createdOn)}</td>
                                <td>{task.createdBy}</td>
                                <td>
                                    <select className="update-task-select" name="assignedTo" value={task.assignedTo} onChange={(e) => handleChange(e, task.id)}>
                                        {users.map(user => (
                                            <option key={user.email} value={user.email}>{user.email}</option>
                                        ))}
                                    </select>
                                </td>
                                <td><input className="update-task-input" type="date" value={task.dueDate.split('T')[0]} name="dueDate" onChange={(e) => handleChange(e, task.id)} /></td>
                                <td>
                                    <select className="update-task-select" name="status" value={task.status} onChange={(e) => handleChange(e, task.id)}>
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                                <td>
                                    <select className="update-task-select" name="category" value={task.category} onChange={(e) => handleChange(e, task.id)}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </td>
                                <td><button className="save-button" onClick={() => handleSave(task.id, task)}>Save</button></td>
                            </>
                        ) : (
                            <>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{formatDate(task.createdOn)}</td>
                                <td>{task.createdBy}</td>
                                <td>{task.assignedTo}</td>
                                <td>{formatDate(task.dueDate)}</td>
                                <td>{task.status}</td>
                                <td>{task.category}</td>
                                <td><button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button></td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UpdateTask;

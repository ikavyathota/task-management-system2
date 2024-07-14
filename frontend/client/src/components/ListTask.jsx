import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListTask.css'; 
const ListTasks = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        createdBy: '',
        assignedTo: '',
        status: '',
        category: ''
    });

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
        fetchTasks();
    }, [token]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
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
    const filteredTasks = tasks.filter(task => {
        return (
            task.createdBy.toLowerCase().includes(filters.createdBy.toLowerCase()) &&
            task.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase()) &&
            task.status.toLowerCase().includes(filters.status.toLowerCase()) &&
            task.category.toLowerCase().includes(filters.category.toLowerCase())
        );
    });

    return (
        <div className="list-tasks">
            <h2>Apply filters</h2>
            <div className="filters">
                <div className="filter-group">
                    <label className="filter-label">Created By:</label>
                    <input
                        type="text"
                        className="filter-input"
                        value={filters.createdBy}
                        onChange={handleFilterChange}
                        name="createdBy"
                    />
                </div>
                <div className="filter-group">
                    <label className="filter-label">Assigned To:</label>
                    <input
                        type="text"
                        className="filter-input"
                        value={filters.assignedTo}
                        onChange={handleFilterChange}
                        name="assignedTo"
                    />
                </div>
                <div className="filter-group">
                    <label className="filter-label">Status:</label>
                    <input
                        type="text"
                        className="filter-input"
                        value={filters.status}
                        onChange={handleFilterChange}
                        name="status"
                    />
                </div>
                <div className="filter-group">
                    <label className="filter-label">Category:</label>
                    <input
                        type="text"
                        className="filter-input"
                        value={filters.category}
                        onChange={handleFilterChange}
                        name="category"
                    />
                </div>
            </div>
            <table className="list-tasks-table">
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
                    {filteredTasks.map(task => (
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
};

export default ListTasks;
